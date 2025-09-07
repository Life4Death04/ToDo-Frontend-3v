import { Input, SubmitBtn, Button } from "../Common/CommonComponents";
import type { User } from "../../types";

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
    return(
        <section className="bg-white shadow-2xl rounded-lg xsm:p-4 md:p-8">
            <h2 className="text-xl font-bold">User Profile</h2>
            <div className="flex items-center my-6 mb-8 xsm:justify-center xsm:gap-4 lg:justify-start lg:gap-8">
                <div className="flex items-center justify-center font-bold text-white bg-orange text-4xl xsm:w-24 rounded-full xsm:h-24 xsm:text-4xl sm:text-5xl sm:w-28 sm:h-28 lg:w-32 lg:h-32 lg:">
                    {initials}
                </div>
                {/* <div className="flex xsm:flex-col xsm:gap-4 lg:flex-row lg:gap-2">
                    <Button textButton="Change Photo"/>
                    <Button textButton="Remove" buttonStyle="bg-gray-200 font-bold text-black hover:bg-gray-300"/>
                </div> */}
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="flex xsm:flex-col md:flex-row md:gap-8 justify-between">
                    <Input
                        type="text"
                        name="firstName"
                        label="First Name"
                        value={values?.firstName || ""}
                        onChange={onChange}
                        disabled={!isEditting}
                        isLoading={isUserDataLoading}
                        isError={isError}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        label="Last Name"
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
                    label="Email Address"
                    value={values?.email || ""}
                    onChange={onChange}
                    disabled={!isEditting}
                    isLoading={isUserDataLoading}
                    isError={isError}
                />
                <div>
                    <span className="xsm:text-sm md:text-base font-bold">Password</span>
                    <a href="#" className="text-blue-500 underline block mt-2  xsm:text-sm md:text-base">Change Password</a>
                </div>
                <div className="mt-8 lg:flex md:justify-center lg:border-t lg:border-gray-400 lg:pt-4 lg:justify-end">
                    {isEditting ? 
                        <div className="flex gap-4 xsm:flex-col-reverse sm:flex-row sm:justify-center">
                            <Button textButton="Cancel" buttonStyle="bg-gray-200 font-bold text-black hover:bg-gray-300" onClick={onEdit}/>
                            <SubmitBtn buttonText="Save Changes" isPending={isSubmitLoading} />
                        </div>
                        : 
                        <Button textButton="Edit" buttonStyle="xsm:w-full sm:w-auto sm:px-6 lg:px-8 bg-orange hover:bg-orange-strong text-white font-bold" onClick={onEdit}></Button>
                    }
                </div>
            </form>
        </section>
    )
}''