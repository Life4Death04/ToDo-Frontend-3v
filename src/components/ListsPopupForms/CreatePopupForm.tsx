import { useModal } from "../../contexts/ModalContext";
import { ButtonIcon } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";

export default function CreatePopupForm(){
    const { isCreateListOpen, closeCreateList } = useModal();

    if(!isCreateListOpen) return null;

    return(
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
            <section className="rounded-2xl bg-white p-4 xsm:w-70 sm:w-110 lg:w-150">
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                    <h2>Create New List</h2>
                    <ButtonIcon iconStyle="fa-solid fa-x" onClick={closeCreateList}/>
                </div>
                <form className="mt-4 text-center">
                    <Input 
                        name="listName"
                        type="text" 
                        value=""
                        label="List Name"
                        placeholder="Enter list name"
                        onChange={() => {}}
                    />
                    <Input 
                        name="listColor"
                        type="color" 
                        value=""
                        label="List Color"
                        dimensions="xsm:h-20 md:h-40"
                        onChange={() => {}}
                    />
                    <SubmitBtn buttonText="Create List" isPending={false} />
                </form>
            </section>
        </div>
    );
}