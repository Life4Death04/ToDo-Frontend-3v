import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Settings } from '../types';
import { useFetchUserSettings, useUpdateUserSettings } from '../hooks/useTasks';
import { useTranslation } from 'react-i18next';

type SettingsState = Omit<Settings, 'id' | 'userId'> | null;

type SettingsContextValue = {
  settings: SettingsState;
  isLoading: boolean;
  isError: boolean;
  updateSettings: (payload: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }){
  // make token reactive
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  // update token when storage changes (other tabs) or when a custom event is dispatched (same tab)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') setToken(e.newValue);
    };
    const onTokenChanged = () => setToken(localStorage.getItem('token'));

    window.addEventListener('storage', onStorage);
    window.addEventListener('todo3v:token-changed', onTokenChanged);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('todo3v:token-changed', onTokenChanged);
    };
  }, []);

  // only fetch when token exists; pass boolean flag to hook
  const { data, isLoading, isError, refetch } = useFetchUserSettings(Boolean(token));

  // if token becomes available after mount, trigger a refetch so settings apply immediately
  useEffect(() => {
    if (token) {
      // refetch might be undefined depending on your hook implementation; guard it
      refetch?.();
    }
  }, [token, refetch]);

  const { i18n } = useTranslation();

  useEffect(() => {
    const theme = data?.theme;
    // only persist when backend explicitly provides a theme value
    if (typeof theme !== 'undefined' && theme !== null) {
      const themeStr = String(theme);
      localStorage.setItem('theme', themeStr);
      if (themeStr.toUpperCase() === 'DARK') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      // backend did not return a theme: don't write "undefined"
      // clear stored value or keep previous value depending on desired behavior
      // here we remove the key so a safe default or user preference can apply
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    }
  }, [data?.theme]);

  useEffect(() => {
    const lang = data?.language;
    if (lang) {
      localStorage.setItem('language', String(lang));
      if (String(lang).toUpperCase() === 'ES') i18n.changeLanguage('es');
      else i18n.changeLanguage('en');
    }
  }, [data?.language]);

  const updater = useUpdateUserSettings();

  const updateSettings = async (payload: Partial<Settings>) => {
    try{
      await updater.mutateAsync(payload);
    }catch(err){
      // swallow here; callers can rely on updater's status or provide UI
      console.error('Failed updating settings', err);
    }
  }

  const value = useMemo(() => ({
    settings: data ?? null,
    isLoading,
    isError,
    updateSettings
  }), [data, isLoading, isError]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(){
  const ctx = useContext(SettingsContext);
  if(!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export default SettingsContext;
