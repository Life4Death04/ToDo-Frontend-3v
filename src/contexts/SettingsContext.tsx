import { createContext, useContext, useMemo, useEffect } from 'react';
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
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // check for token presence
  const { data, isLoading, isError } = useFetchUserSettings(token !== null); // only fetch if token exists (avoids unnecessary calls)
  const updater = useUpdateUserSettings();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = data?.language;
    if(lang === 'ES') i18n.changeLanguage('es');
    else i18n.changeLanguage('en');
    console.log("Language set to", lang);
  }, [data?.language]);

  const updateSettings = async (payload: Partial<Settings>) => {
    try{
      await updater.mutateAsync(payload as Settings);
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
