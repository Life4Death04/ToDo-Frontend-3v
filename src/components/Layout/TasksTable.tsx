export function TasksTable(){
    return(
        <main className="px-2 pt-4 xsm:ml-12 lg:ml-64">
            <h1 className="font-bold mb-4 xsm:text-xl md:text-2xl lg:text-3xl">My Tasks</h1>
            <header className="items-center bg-gray-100 px-4 py-2 text-gray-400 border-gray-400 border-b-1 font-bold xsm:hidden lg:flex">
                <span className="flex-[2]">Task Name</span>
                <span className="flex-1">Due Date</span>
                <span className="flex-1">Priority</span>
                <span className="flex-1">Status</span>
                <span className="w-20 text-right">Actions</span>
            </header>
            <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-gray-200">
                <TaskItem
                    content="Task 1"
                    dueDate="2023-10-01"
                    priority="High"
                    status="In Progress"
                />
                <TaskItem
                    content="Task 2"
                    dueDate="2023-10-02"
                    priority="Medium"
                    status="Completed"
                />
            </ul>
        </main>
    );
}

type TaskItemProps = {
    content: string,
    dueDate: string,
    priority: string,
    status: string,
}

function TaskItem({content, dueDate, priority, status}: TaskItemProps){
    return(
        <li className="lg:flex lg:gap-3 bg-white lg:border-b-1 lg:border-gray-400 xsm:p-3 py-3 px-4 xsm:shadow-xl lg:shadow-none xsm:rounded-lg lg:rounded-none">
            <div className="flex gap-2 items-center flex-[2]">
                {/* <i className="fa-solid fa-square-check text-orange text-xl"></i> */}
                {/* <i className="fa-regular fa-square xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer"></i> */}
                {status === 'Completed' ? <i className="fa-solid fa-square-check text-orange text-xl"></i> : <i className="fa-regular fa-square xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer"></i>}
                <span className="xsm:text-sm md:text-base lg:text-lg overflow text-wrap">
                    {content}
                </span>
                <button className="text-gray-400 hover:text-orange ">
                    <i className="fa-solid fa-pen xsm:text-base lg:text-lg"></i>
                </button>
                <div className="ml-auto mt-auto text-center w-20 lg:self-center lg:hidden">
                    <i className="fa-regular fa-trash-can xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer"></i>
                </div>
            </div>
            <div className="flex xsm:flex-col lg:flex-row lg:items-center xsm:gap-3 xsm:mt-4 lg:mt-0 flex-[3]">
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1">
                    {dueDate}
                </span>
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1 text-red-500 font-bold">
                    {priority}
                </span>
                <div className="lg:flex-1"> 
                    <span className="xsm:text-xs md:text-sm lg:text-base xsm:w-fit bg-amber-100 px-2 py-1 rounded-xl text-amber-500 font-bold">
                        {status}
                    </span>
                </div>
            </div>
            <div className="ml-auto mt-auto text-center w-20 lg:block lg:self-center xsm:hidden">
                <i className="fa-regular fa-trash-can xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer"></i>
            </div>
        </li>
    );
}