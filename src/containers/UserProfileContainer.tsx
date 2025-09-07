import { UserProfileForm } from "../components/UserProfileForm/UserProfileForm";
import { useFetchMeData, useUpdateUserData } from "../hooks/useUsers";
import { useState } from "react";
import type { User } from "../types";

export function UserProfileContainer(){
    const { data: userData, isLoading, isError } = useFetchMeData();
    const updateUser = useUpdateUserData();
    const isSubmitLoading = updateUser.isPending;
    const [user, setUser] = useState<User>(userData!);
    const [isEditing, setIsEditing] = useState(false);
    const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '?';

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            id: user.id!,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        updateUser.mutate(payload, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            <UserProfileForm 
                values={user} 
                initials={initials}
                onEdit={toggleEdit} 
                isEditting={isEditing} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                isUserDataLoading={isLoading} 
                isSubmitLoading={isSubmitLoading} 
                isError={isError}
            />
        </main>
    );
}