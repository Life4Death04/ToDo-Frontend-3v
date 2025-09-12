import { UserProfileForm } from "../components/UserProfileForm/UserProfileForm";
import { useFetchMeData, useUpdateUserData } from "../hooks/useUsers";
import { useState, useEffect } from "react";
import type { User } from "../types";

export function UserProfileContainer(){
    const { data: userData, isLoading, isError } = useFetchMeData();
    const updateUser = useUpdateUserData();
    const isSubmitLoading = updateUser.isPending;

    // local user state starts null and is populated when fetch resolves
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // initialize local state when userData arrives
    useEffect(() => {
        if (userData) setUser(userData);
    }, [userData]);

    const current: User = user ?? userData ?? {
        id: undefined,
        firstName: '',
        lastName: '',
        email: ''
    };

    const initials = `${current.firstName?.[0] ?? ''}${current.lastName?.[0] ?? ''}`.toUpperCase() || '?';

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...(prev ?? current),
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const targetUser = user ?? userData;
        if (!targetUser || !targetUser.id) return;

        const payload = {
            id: targetUser.id,
            firstName: targetUser.firstName,
            lastName: targetUser.lastName,
            email: targetUser.email
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
                values={current} 
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