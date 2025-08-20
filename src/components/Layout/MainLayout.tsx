import { TasksTable } from "./TasksTable";
import { IndicatorsPanel } from "./RadialIndicator";
import { Sidebar } from "./Sidebar";

export default function MainLayout(){
    return(
        <div className="xsm:ml-12 sm:ml-20 lg:ml-64">
            <Sidebar></Sidebar>
            <TasksTable />
            <IndicatorsPanel />
        </div>
    );
}