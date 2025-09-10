import { Sidebar } from "../components/Sidebar/Sidebar";
import { useListManager } from "../hooks/useListManager";
import { useFetchLists } from "../hooks/useLists";
import { useFetchMeData, useLogoutUser } from "../hooks/useUsers";
// -------------------- Types --------------------

// -------------------- Sidebar Container --------------------
/**
 * SidebarContainer
 * Fetches current user and lists via hooks and wires Modal controls for
 * opening the create-list dialog. Passes fetched data and handlers to
 * the presentational `Sidebar` component.
 *
 * @returns JSX.Element
 */
export function SidebarContainer(){
    const logout = useLogoutUser();
    const { data: meData, isError: isMeDataError, isLoading: isMeDataLoading } = useFetchMeData();
    const { data: listsData, isError: isListsError, isLoading: isListsLoading } = useFetchLists();
    const { openListWith } = useListManager({ userId: meData?.id || 0 });

    return (
        <Sidebar
            onLogout={logout}
            meData={meData}
            isMeDataLoading={isMeDataLoading}
            isMeDataError={isMeDataError}
            listsData={listsData}
            isListsLoading={isListsLoading}
            isListsError={isListsError}
            onCreateList={openListWith}
        />
    );  
}