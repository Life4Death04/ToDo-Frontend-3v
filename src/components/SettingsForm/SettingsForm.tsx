import { PageMockup, ToggleButtons, Select, languageOptions } from "../Common/CommonComponents";
import { priorityOptions, statusOptions, dateFormatOptions } from "../Common/CommonComponents";
import type { Settings } from "../../types";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

type SettingsFormProps = {
    values?: Omit<Settings, 'id' | 'authorId'>;
    isEditing: boolean;
    onEdit: () => void;
    isSubmitLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onThemeChange: (value: Settings['theme']) => void;
    onSubmit: (e: React.FormEvent) => void;
    isDataLoading?: boolean;
    isError?: boolean;
}

export function SettingsForm({ values, isEditing, onEdit, isSubmitLoading, onChange, onThemeChange, onSubmit, isDataLoading, isError }: SettingsFormProps){
    const { t } = useTranslation("translation");
    return(
        <PageMockup header={t('settings.header')}>
            <form className="w-full" onSubmit={onSubmit}>
                <div className="flex xsm:flex-col md:flex-row md:gap-8">
                    <Select 
                        label={t('settings.labels.dateFormat')}
                        type="dateFormat"
                        options={dateFormatOptions}
                        currentValue={values?.dateFormat || ``}
                        onChange={onChange}
                        disabled={!isEditing}
                        isLoading={isDataLoading}
                        isError={isError}
                    />
                    <Select 
                        label={t('settings.labels.language')}
                        type="language"
                        options={languageOptions}
                        currentValue={values?.language || ``}
                        onChange={onChange}
                        disabled={!isEditing}
                        isLoading={isDataLoading}
                        isError={isError}
                    />
                </div>
                <div className="flex xsm:flex-col md:flex-row md:gap-8">
                    <Select
                        inputName="defaultPriority"
                        label={t('settings.labels.defaultPriority')}
                        type="priority"
                        options={priorityOptions}
                        currentValue={values?.defaultPriority || ``}
                        onChange={onChange}
                        disabled={!isEditing}
                        isLoading={isDataLoading}
                        isError={isError}
                    />
                    <Select
                        inputName="defaultStatus"
                        label={t('settings.labels.defaultStatus')}
                        type="status"
                        options={statusOptions}
                        currentValue={values?.defaultStatus || ``}
                        onChange={onChange}
                        disabled={!isEditing}
                        isLoading={isDataLoading}
                        isError={isError}
                    />
                </div>
                <ThemeToggle value={values?.theme} onChange={onThemeChange} disabled={!isEditing}></ThemeToggle>
                <ToggleButtons isEditting={isEditing} onEdit={onEdit} isSubmitLoading={isSubmitLoading}/>
            </form>
        </PageMockup>
    );
}

type ThemeValue = "LIGHT" | "DARK";
type ThemeToggleProps = {
    value?: ThemeValue;
    onChange: (value: ThemeValue) => void;
    disabled?: boolean;
}

function ThemeToggle({value, onChange, disabled}: ThemeToggleProps){
    const btnBase = "border border-black/20 bg-gray-200 xsm:flex-grow xsm:py-2 xsm:text-base md:text-base lg:text-base rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer";
    const lightActive = "bg-orange text-white";
    const darkActive = "bg-gray-800 text-white";
    /* const inactiveBtn = "border border-black/20 bg-gray-200 xsm:flex-grow xsm:py-2 xsm:text-base md:text-base lg:text-base rounded-lg font-bold flex items-center justify-center gap-2 opacity-50"; */

    return(
        <div className="text-left flex-grow mb-5 gap-5">
            <label className="block font-bold mb-2 capitalize dark:text-text-dark-white">
                {t('settings.labels.theme')}
            </label>
            <div className="flex gap-2">
                <button
                    name="theme"
                    className={`${btnBase} ${disabled && 'opacity-50'} ${value === 'LIGHT' && lightActive}`}
                    type="button"
                    aria-pressed={value === 'LIGHT'}
                    onClick={() => !disabled && onChange("LIGHT")}
                    disabled={disabled}
                >
                    <i className="fa-solid fa-sun"></i> 
                    {t('settings.theme.light')}
                </button>
                <button
                    name="theme"
                    className={`${btnBase} ${disabled && 'opacity-50'} ${value === 'DARK' && darkActive}`}
                    type="button"
                    aria-pressed={value === 'DARK'}
                    onClick={() => !disabled && onChange("DARK")}
                    disabled={disabled}
                >
                    <i className="fa-solid fa-moon"></i> 
                    {t('settings.theme.dark')}
                </button>
            </div>
        </div>
    )
}
