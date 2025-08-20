import { IndicatorPanels } from "../Layout/Indicators";
import { TasksTable } from "../Layout/TasksTable";

export default function Home(){
    return(
        <section>
            <IndicatorPanels />
            <TasksTable />
        </section>
    );
}