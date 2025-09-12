import { SidebarContainer } from "../containers/SidebarContainer";
import { Outlet } from "react-router";
import { ModalProvider } from "../contexts/ModalContext";
import { getTheme } from "../utils/themeHelper";
import { useEffect } from "react";
import { useFetchUserSettings } from "../hooks/useTasks";

export default function AppLayout(){
    const { data } = useFetchUserSettings(true);

    // Apply theme from user settings on load
    useEffect(() => {
        const theme = data?.theme;
        getTheme(theme || 'LIGHT');
    }, [data?.theme]);

    return(
        <ModalProvider>
            <main className="relative xsm:ml-12 sm:ml-20 lg:ml-64">
                <SidebarContainer />
                <Outlet />
            </main>
        </ModalProvider>
    );
}