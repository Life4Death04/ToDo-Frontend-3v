import { useState } from "react";
import { useFetchUserSettings, useUpdateUserSettings } from "../hooks/useTasks";
import { SettingsForm } from "../components/SettingsForm/SettingsForm"; 
import { useEffect } from "react";
import type { Settings } from "../types";

type SettingState = Omit<Settings, 'id' | 'userId'>;

const DEFAULTS: SettingState = {
  theme: 'LIGHT',
  dateFormat: 'YYYY_MM_DD',
  language: 'EN',
  defaultPriority: 'LOW',
  defaultStatus: 'TODO',
};

export function SettingsContainer(){
    const { data: settingsData, isLoading, isError } = useFetchUserSettings();
    const updateSettings = useUpdateUserSettings();
    const isSubmitLoading = updateSettings.isPending;
    // local state starts null and is populated when fetch resolves
    const [settings, setSettings] = useState<SettingState | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // when settingsData arrives, initialize local state (merge with safe defaults)
    useEffect(() => {
      if (!settingsData) return;
      setSettings({
        theme: settingsData.theme ?? DEFAULTS.theme,
        dateFormat: settingsData.dateFormat ?? DEFAULTS.dateFormat,
        language: settingsData.language ?? DEFAULTS.language,
        defaultPriority: settingsData.defaultPriority ?? DEFAULTS.defaultPriority,
        defaultStatus: settingsData.defaultStatus ?? DEFAULTS.defaultStatus,
      });
    }, [settingsData]);

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...(prev ?? (settingsData ? {
              theme: settingsData.theme ?? DEFAULTS.theme,
              dateFormat: settingsData.dateFormat ?? DEFAULTS.dateFormat,
              language: settingsData.language ?? DEFAULTS.language,
              defaultPriority: settingsData.defaultPriority ?? DEFAULTS.defaultPriority,
              defaultStatus: settingsData.defaultStatus ?? DEFAULTS.defaultStatus,
            } : DEFAULTS)),
            [name]: value
        }));
    }

    const handleThemeChange = (value: SettingState['theme']) => {
        setSettings(prev => ({
            ...(prev ?? DEFAULTS),
            theme: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const current = settings ?? {
          theme: settingsData?.theme ?? DEFAULTS.theme,
          dateFormat: settingsData?.dateFormat ?? DEFAULTS.dateFormat,
          language: settingsData?.language ?? DEFAULTS.language,
          defaultPriority: settingsData?.defaultPriority ?? DEFAULTS.defaultPriority,
          defaultStatus: settingsData?.defaultStatus ?? DEFAULTS.defaultStatus,
        };

        const payload = {
            theme: current.theme,
            dateFormat: current.dateFormat,
            language: current.language,
            defaultPriority: current.defaultPriority,
            defaultStatus: current.defaultStatus
        };
        updateSettings.mutate(payload, {
            onSuccess: () => {
                setIsEditing(prev => !prev);
            }
        });
    }

    const valuesToPass = settings ?? {
      theme: settingsData?.theme ?? DEFAULTS.theme,
      dateFormat: settingsData?.dateFormat ?? DEFAULTS.dateFormat,
      language: settingsData?.language ?? DEFAULTS.language,
      defaultPriority: settingsData?.defaultPriority ?? DEFAULTS.defaultPriority,
      defaultStatus: settingsData?.defaultStatus ?? DEFAULTS.defaultStatus,
    };

    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            <SettingsForm 
                isError={isError}
                values={valuesToPass}
                isEditing={isEditing}
                onChange={handleChange}
                onThemeChange={handleThemeChange}
                onEdit={toggleEdit}
                onSubmit={handleSubmit}
                isSubmitLoading={isSubmitLoading}
                isDataLoading={isLoading}
            />
        </main>
    );
}