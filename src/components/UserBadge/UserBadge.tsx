import { useFetchUserData } from "../../api/usersQuery";
import { useParams } from "react-router";
import type { User } from '../../types';

// -------------------- User Info Component (self-contained) --------------------
export function UserBadge(){
    // Read userId from route params; component handles its own fetching
    const { userId: userIdParam } = useParams();
    /* const userId = userIdParam ? Number(userIdParam) : undefined;

    // Validate userId: if missing/invalid, render nothing (sidebar may still render)
    if(!userIdParam || Number.isNaN(userId as number)){
        return null;
    } */
   if(!userIdParam) return null;
   const parsedUserId = Number(userIdParam);
   if(Number.isNaN(parsedUserId)) return null;

    const { data, isLoading, isError } = useFetchUserData(parsedUserId);
    const user = data;

    // Simple loading skeleton to avoid layout shift
    if(isLoading){
        return (
            <div className="relative w-full p-1 rounded-2xl mb-4 lg:bg-amber-200" aria-busy="true" aria-live="polite">
                <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div className="hidden lg:flex flex-col gap-1">
                        <div className="w-32 h-3 bg-gray-300 rounded" />
                        <div className="w-48 h-3 bg-gray-300 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Error or no data: show minimal fallback
    if(isError || !data){
        return (
            <div className="relative w-full p-1 rounded-2xl mb-4 lg:bg-amber-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">?</div>
                    <div className="hidden lg:block">
                        <p className="text-xs font-bold">Unknown user</p>
                    </div>
                </div>
            </div>
        );
    }

    // Data present
    const firstName = user?.firstName ?? '';
    const lastName = user?.lastName ?? '';
    const email = user?.email ?? '';
    const avatarUrl = user?.profileImage ?? null; // optional property if exists

    const fullName = `${firstName} ${lastName}`.trim();

    // Fallback initials when no avatar
    const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'U';

    return(
        <div className="relative w-full p-1 rounded-2xl mb-4 lg:bg-amber-200" title={fullName || email} aria-label={fullName || email}>
            <div className="flex items-center gap-3 xsm:justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Avatar avatarUrl={avatarUrl} initials={initials} />
                </div>

                <div className="hidden lg:flex flex-col overflow-hidden">
                    <p className="text-sm font-bold capitalize truncate max-w-[160px]">{fullName || 'No name'}</p>
                    <p className="text-xs text-gray-700 truncate max-w-[160px]">{email}</p>
                </div>
            </div>
      </div>
    );
}

type BadgeShellProps = {
    isLoading?: boolean;
    isError?: boolean;
    title?: string;
    label?: string;
}

export function BadgeShell({ isLoading, isError, title, label}: BadgeShellProps){
    const busy = isLoading;
    return (
        <div 
            className="relative w-full p-1 rounded-2xl mb-4 lg:bg-amber-200"
            aria-busy={busy}
            aria-live="polite"
            title={title || label}
            aria-label={label}
        >
            <div className="flex items-center gap-3 xsm:justify-center lg:justify-start">
            </div>
        </div>
    );
}

type AvatarProps = {
    avatarUrl?: string | null;
    initials?: string | null;
}

export function Avatar({ avatarUrl, initials }: AvatarProps){
    if(avatarUrl){
        return (
            <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" loading="lazy"/>
        );
    }
    // Fallback initials when no avatar
    return (
        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-700">{initials}</div>
    );
}