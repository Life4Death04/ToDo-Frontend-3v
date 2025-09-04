import { UserProfileForm } from "../components/UserProfileForm/UserProfileForm";

export function UserProfileContainer(){
    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            <UserProfileForm />
        </main>
    );
}