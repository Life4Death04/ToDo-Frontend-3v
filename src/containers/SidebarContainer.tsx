import { Sidebar } from "../components/Sidebar/Sidebar";
import { useModal } from "../contexts/ModalContext";
import { useFetchLists } from "../hooks/useLists";
import { useFetchMeData, useLogoutUser } from "../hooks/useUsers";
// -------------------- Types --------------------

// -------------------- Sidebar Container --------------------
export function SidebarContainer(){
    const { openCreateList } = useModal();
    const logout = useLogoutUser();
    const { data: meData, isError: isMeDataError, isLoading: isMeDataLoading } = useFetchMeData();
    const { data: listsData, isError: isListsError, isLoading: isListsLoading } = useFetchLists();

    return (
        <Sidebar
            onLogout={logout}
            meData={meData}
            isMeDataLoading={isMeDataLoading}
            isMeDataError={isMeDataError}
            listsData={listsData}
            isListsLoading={isListsLoading}
            isListsError={isListsError}
            onCreateList={openCreateList}
        />
    );  
}