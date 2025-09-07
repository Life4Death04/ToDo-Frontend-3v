import { Button, PageMockup, ToggleButtons, Select, languageOptions } from "../Common/CommonComponents";
import { priorityOptions, statusOptions, dateFormatOptions } from "../Common/CommonComponents";
import type { Settings } from "../../types";

type SettingsFormProps = {
    values?: Omit<Settings, 'id' | 'authorId'>;
    isEditting: boolean;
    onEdit: () => void;
    isSubmitLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SettingsForm({ values, isEditting, onEdit, isSubmitLoading, onChange }: SettingsFormProps){
    return(
        <PageMockup header="Settings">
            <form className="w-full">
                <div className="flex xsm:flex-col md:flex-row md:gap-8">
                    <Select 
                        label="Date Format"
                        type="dateFormat"
                        options={dateFormatOptions}
                        currentValue={values?.dateFormat || ``}
                        onChange={onChange}
                    />
                    <Select 
                        label="Language"
                        type="language"
                        options={languageOptions}
                        currentValue={values?.language || ``}
                        onChange={onChange}
                    />
                </div>
                <div className="flex xsm:flex-col md:flex-row md:gap-8">
                    <Select
                        label="Default Priority"
                        type="priority"
                        options={priorityOptions}
                        currentValue={values?.defaultPriority || ``}
                        onChange={onChange}
                    />
                    <Select
                        label="Default Status"
                        type="status"
                        options={statusOptions}
                        currentValue={values?.defaultStatus || ``}
                        onChange={onChange}
                    />
                </div>
                <div className="text-left flex-grow mb-5 gap-5">
                    <label className="block font-bold mb-2 capitalize">
                        Theme
                    </label>
                    <div className="flex gap-2">
                        <Button 
                            iconStyle="fa-solid fa-sun"
                            textButton="Light"
                            buttonStyle="border border-black/20 bg-gray-200 xsm:flex-grow xsm:py-2 xsm:text-base md:text-base lg:text-base rounded-lg hover:cursor-pointer hover:bg-orange hover:text-white"
                        />
                        <Button 
                            iconStyle="fa-solid fa-moon"
                            textButton="Dark"
                            buttonStyle="border border-black/20 bg-gray-200 xsm:flex-grow xsm:py-2 xsm:text-base md:text-base lg:text-base rounded-lg hover:cursor-pointer hover:bg-orange hover:text-white"
                        />
                    </div>
                </div>
                <ToggleButtons isEditting={isEditting} onEdit={onEdit} isSubmitLoading={isSubmitLoading}/>
            </form>
        </PageMockup>
    );
}