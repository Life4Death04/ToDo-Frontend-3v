import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { useFetchMeData } from "../../queries/usersQuery";

export default function MainLayout(){
    return(
        <main className="xsm:ml-12 sm:ml-20 lg:ml-64">
            <Sidebar></Sidebar>
            <Outlet />
        </main>
    );
}