import { SidebarContainer } from "../containers/SidebarContainer";
import { Outlet } from "react-router";
import { ModalProvider } from "../contexts/ModalContext";

export default function AppLayout(){
    return(
        <ModalProvider>
            <main className="relative xsm:ml-12 sm:ml-20 lg:ml-64">
                <SidebarContainer />
                <Outlet />
            </main>
        </ModalProvider>
    );
}