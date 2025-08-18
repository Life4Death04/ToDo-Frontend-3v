export function TasksTable(){
    return(
        <main className="px-2 pt-4 xsm:ml-12 lg:ml-64">
            <h1 className="font-bold mb-4 xsm:text-xl md:text-2xl lg:text-3xl">My Tasks</h1>
            <ul className="flex flex-col gap-3 lg:gap-0">
                {/* <li className="p-3 bg-white shadow-xl rounded-lg">
                    <header className="flex justify-between items-end">
                        <div className="flex gap-4 items-end">
                            <button>
                                <i className="fa-solid fa-square-check sm:text-lg md:text-xl"></i>
                            </button>
                            <h3 className="self-start sm:text-lg md:text-xl">Task Content</h3>
                        </div>
                        <button>
                            <i className="fa-solid fa-trash-can sm:text-lg md:text-xl"></i>
                        </button>
                    </header>
                    <p className="my-3 mb-4 text-black/50 sm:text-lg md:text-xl">Due: Date Task</p>
                    <footer>
                        <span className="bg-gray-200 px-3 py-1 rounded-2xl sm:text-lg md:text-xl">
                            Status
                        </span>
                    </footer>
                </li> */}
                <li className="flex justify-between items-center bg-gray-100 p-2 text-gray-400">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-square-check text-xl"></i>
                        <span className="text-md">TASK NAME</span>
                    </div>
                    <div className="flex gap-30">
                        <span className="text-md">
                            DUE DATE
                        </span>
                        <span className="text-md">
                            PRIORITY
                        </span>
                        <span className="text-md">
                            STATUS
                        </span>
                    </div>
                    <div className="">
                        <span className="text-md">
                            ACTIONS
                        </span>
                    </div>
                </li>
                <li className="flex justify-between items-center bg-white border-t-1 border-b-1 border-gray-400 py-4 px-2">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-square-check text-xl"></i>
                        <span className="text-md">TASK NAME</span>
                    </div>
                    <div className="flex gap-30">
                        <span className="text-md">
                            DUE DATE
                        </span>
                        <span className="text-md">
                            PRIORITY
                        </span>
                        <span className="text-md">
                            STATUS
                        </span>
                    </div>
                    <div className="">
                        <span className="text-md">
                            ACTIONS
                        </span>
                    </div>
                </li>
                <li className="flex justify-between items-center bg-white border-t-1 border-b-1 border-gray-400 py-4 px-2">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-square-check text-xl"></i>
                        <span className="text-md">TASK NAME</span>
                    </div>
                    <div className="flex gap-30">
                        <span className="text-md">
                            DUE DATE
                        </span>
                        <span className="text-md">
                            PRIORITY
                        </span>
                        <span className="text-md">
                            STATUS
                        </span>
                    </div>
                    <div className="">
                        <span className="text-md">
                            ACTIONS
                        </span>
                    </div>
                </li>
                <li className="flex justify-between items-center bg-white border-t-1 border-b-1 border-gray-400 py-4 px-2">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-square-check text-xl"></i>
                        <span className="text-md">TASK NAME</span>
                    </div>
                    <div className="flex gap-30">
                        <span className="text-md">
                            DUE DATE
                        </span>
                        <span className="text-md">
                            PRIORITY
                        </span>
                        <span className="text-md">
                            STATUS
                        </span>
                    </div>
                    <div className="">
                        <span className="text-md">
                            ACTIONS
                        </span>
                    </div>
                </li>
                <li className="flex justify-between items-center bg-white border-t-1 border-b-1 border-gray-400 py-4 px-2">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-square-check text-xl"></i>
                        <span className="text-md">TASK NAME</span>
                    </div>
                    <div className="flex gap-30">
                        <span className="text-md">
                            DUE DATE
                        </span>
                        <span className="text-md">
                            PRIORITY
                        </span>
                        <span className="text-md">
                            STATUS
                        </span>
                    </div>
                    <div className="">
                        <span className="text-md">
                            ACTIONS
                        </span>
                    </div>
                </li>
            </ul>
        </main>
    );
}