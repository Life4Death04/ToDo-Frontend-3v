import { Input, PageMockup, ProfileImage, ToggleButtons } from "../Common/CommonComponents";
import type { User } from "../../types";
import { useTranslation } from "react-i18next";

type UserProfileFormProps = {
    values?: User;
    isEditting: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onEdit: () => void;
    isUserDataLoading: boolean;
    isSubmitLoading: boolean;
    isError: boolean;
    initials: string;
}

export function UserProfileForm({ values, isEditting, onChange, onSubmit, onEdit, isUserDataLoading, isSubmitLoading, isError, initials }: UserProfileFormProps){
    const { t } = useTranslation("translation");
    return(
        <PageMockup header={t('profile.header')} leftSlot={<ProfileImage initials={initials}/>}>
            <form onSubmit={(e) => onSubmit(e)} className="w-full">
                <div className="flex xsm:flex-col md:flex-row md:gap-8 justify-between">
                    <Input
                        type="text"
                        name="firstName"
                        label={t('profile.firstName')}
                        value={values?.firstName || ""}
                        onChange={onChange}
                        disabled={!isEditting}
                        isLoading={isUserDataLoading}
                        isError={isError}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        label={t('profile.lastName')}
                        value={values?.lastName || ""}
                        onChange={onChange}
                        disabled={!isEditting}
                        isLoading={isUserDataLoading}
                        isError={isError}
                    />
                </div>
                <Input
                    type="text"
                    name="email"
                    label={t('profile.emailAddress')}
                    value={values?.email || ""}
                    onChange={onChange}
                    disabled={!isEditting}
                    isLoading={isUserDataLoading}
                    isError={isError}
                />
                <div>
                    <span className="xsm:text-sm md:text-base font-bold dark:text-text-dark-white">{t('profile.passwordLabel')}</span>
                    <a href="#" className="text-blue-500 underline block mt-2  xsm:text-sm md:text-base">{t('profile.changePassword')}</a>
                </div>
                <ToggleButtons isEditting={isEditting} onEdit={onEdit} isSubmitLoading={isSubmitLoading}/>
            </form>
        </PageMockup>
    )
}

