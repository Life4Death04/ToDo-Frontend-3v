import type { User } from "../../types";

type UserBadgeProps = {
    userData: User;
    isLoading: boolean;
    isError: boolean;
}

// -------------------- User Info Component (self-contained) --------------------
export function UserBadge({userData, isLoading, isError}: UserBadgeProps){
    const { firstName, lastName, email, avatarUrl } = userData;

    /* // Data present
    const firstName = user?.firstName ?? '';
    const lastName = user?.lastName ?? '';
    const email = user?.email ?? '';
    const avatarUrl = user?.profileImage ?? null; // optional property if exists */

    const fullName = `${firstName} ${lastName}`;

    // Fallback initials when no avatar
    const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

    return(
        <BadgeShell isError={isError} isLoading={isLoading} fullName={fullName} email={email}>
            <Avatar avatarUrl={avatarUrl} initials={initials} isError={isError}/>
        </BadgeShell>
    );
}

type BadgeShellProps = {
    children?: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
    email?: string;
    fullName?: string;
}

export function BadgeShell({ isLoading, isError, children, email, fullName }: BadgeShellProps){
    const busy = isLoading;
    return (
        <div 
            className="relative w-full p-1 rounded-2xl mb-4 lg:bg-amber-200"
            aria-busy={busy}
            aria-live="polite"
            title={fullName || 'No name'}
            aria-label={fullName || ''}
        >
            <div className="flex items-center gap-3 xsm:justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {children}
                </div>

                <div className="hidden lg:flex flex-col overflow-hidden">
                    {isError && <p className="text-xs font-bold">Unknown user</p>}
                    {isLoading && 
                        <div className="hidden lg:flex flex-col gap-1">
                            <div className="w-32 h-3 bg-gray-300 rounded" />
                            <div className="w-48 h-3 bg-gray-300 rounded" />
                        </div>}
                    <p className="text-sm font-bold capitalize truncate max-w-[160px]">{fullName}</p>
                    <p className="text-xs text-gray-700 truncate max-w-[160px]">{email}</p>
                </div>
            </div>
        </div>
    );
}

type AvatarProps = {
    avatarUrl?: string | null;
    initials?: string | null;
    isError: boolean;
}

export function Avatar({ avatarUrl, initials, isError }: AvatarProps){
    if(avatarUrl){
        return (
            <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" loading="lazy"/>
        );
    }
    // Fallback initials when no avatar
    return (
        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-700">
            {isError && <span className="text-red-500"></span>}
            {avatarUrl ? <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" loading="lazy"/> : initials}
        </div>
    );
}
