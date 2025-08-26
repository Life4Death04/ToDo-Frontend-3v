import { Sidebar } from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router";

export default function AppPage(){
    return(
        <main className="xsm:ml-12 sm:ml-20 lg:ml-64">
            <Sidebar></Sidebar>
            <Outlet />
        </main>
    );
}