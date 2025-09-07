import { useState } from "react";
import { useFetchUserSettings, useUpdateUserSettings } from "../hooks/useTasks";
import { SettingsForm } from "../components/SettingsForm/SettingsForm";
import type { Settings } from "../types";

type SettingState = Omit<Settings, 'id' | 'authorId'>;

export function SettingsContainer(){
    const { data: settingsData, isLoading, isError } = useFetchUserSettings();
    const updateSettings = useUpdateUserSettings();
    const isSubmitLoading = updateSettings.isPending;
    const [settings, setSettings] = useState<SettingState>(settingsData!);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleThemeChange = (value: SettingState['theme']) => {
        setSettings((prev) => ({
            ...prev,
            theme: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            theme: settings.theme,
            dateFormat: settings.dateFormat,
            language: settings.language,
            defaultPriority: settings.defaultPriority,
            defaultStatus: settings.defaultStatus
        };
        updateSettings.mutate(payload, {
            onSuccess: () => {
                setIsEditing(prev => !prev);
            }
        });
    }     

    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            <SettingsForm 
                isError={isError}
                values={settings}
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