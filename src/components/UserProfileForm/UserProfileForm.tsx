import { Input, SubmitBtn, Button } from "../Common/CommonComponents";

const isEditting = true;

export function UserProfileForm(){
    return(
        <section className="bg-white shadow-2xl rounded-lg xsm:p-4 md:p-8">
            <h2 className="text-xl font-bold">User Profile</h2>
            <div className="flex items-center my-6 mb-8 xsm:justify-center xsm:gap-4 lg:justify-start lg:gap-8">
                <div className="bg-orange xsm:w-24 rounded-full xsm:h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"></div>
                <div className="flex xsm:flex-col xsm:gap-4 lg:flex-row lg:gap-2">
                    <Button textButton="Change Photo"/>
                    <Button textButton="Remove"/>
                </div>
            </div>
            <form action="">
                <div className="flex xsm:flex-col md:flex-row md:gap-8 justify-between">
                    <Input
                        type="text"
                        name="firstName"
                        label="First Name"
                        value=""
                        onChange={() => {}}
                        disabled={!isEditting}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        label="Last Name"
                        value=""
                        onChange={() => {}}
                        disabled={!isEditting}
                    />
                </div>
                <Input
                    type="text"
                    name="email"
                    label="Email Address"
                    value=""
                    onChange={() => {}}
                    disabled={!isEditting}
                />
                <div>
                    <span className="xsm:text-sm md:text-base">Password</span>
                    <a href="#" className="text-blue-500 underline block mt-2  xsm:text-sm md:text-base">Change Password</a>
                </div>
                <div className="mt-8 lg:flex md:justify-center lg:border-t lg:border-gray-400 lg:pt-4 lg:justify-end">
                    {isEditting ? 
                        <div className="flex gap-4 xsm:flex-col-reverse sm:flex-row sm:justify-center">
                            <button className="bg-gray-200 rounded-lg xsm:p-2 xsm:text-sm md:text-base lg:px-3 lg:py-2 hover:cursor-pointer hover:bg-orange font-bold">Cancel</button>
                            <SubmitBtn buttonText="Save Changes" isPending={false} />
                            <Button textButton="Cancel" buttonStyle="bg-gray text-black"/>
                        </div>
                        : 
                        <Button textButton="Edit" buttonStyle="xsm:w-full sm:w-auto sm:px-6 lg:px-8"></Button>
                    }
                </div>
            </form>
        </section>
    )
}''