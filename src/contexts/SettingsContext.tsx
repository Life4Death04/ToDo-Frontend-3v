import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Settings } from '../types';
import { useFetchUserSettings, useUpdateUserSettings } from '../hooks/useTasks';

type SettingsState = Omit<Settings, 'id' | 'userId'> | null;

type SettingsContextValue = {
  settings: SettingsState;
  isLoading: boolean;
  isError: boolean;
  updateSettings: (payload: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }){
  const { data, isLoading, isError } = useFetchUserSettings();
  const updater = useUpdateUserSettings();

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
