import { Link } from "react-router";

export function Sidebar(){
  return(
    <nav className="fixed top-0 left-0 h-screen w-16 sm:w-20 lg:w-64 lg:px-2 lg:py-3 bg-gray-200 flex flex-col xsm:items-center lg:items-start">
      <header className="flex items-baseline gap-4 px-3 py-2 xsm:mb-4">
        <i className="fa-solid fa-list-check sm:text-xl md:text-3xl lg:text-3xl"></i>
        <h1 className="font-bold xsm:hidden lg:inline lg:text-2xl">TaskMaster</h1>
      </header>
      <ul className="flex flex-col h-full gap-4 w-full xsm:items-center lg:items-start">
        <Link to="/settings" >
          <li className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:rounded-3xl hover:shadow-md">
            <i className="fa-solid fa-user sm:text-xl md:text-2xl"></i>
            <span className="xsm:hidden lg:inline">My Tasks</span>
          </li>
        </Link>
        <Link to="/settings">
          <li className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:rounded-3xl hover:shadow-md">
            <i className="fa-solid fa-user sm:text-xl md:text-2xl"></i>
            <span className="xsm:hidden lg:inline">Shared Tasks</span>
          </li>
        </Link>
        <Link to="/settings">
          <li className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:rounded-3xl hover:shadow-md">
            <i className="fa-solid fa-user sm:text-xl md:text-2xl"></i>
            <span className="xsm:hidden lg:inline">Archived Tasks</span>
          </li>
        </Link>
      </ul>
      <footer className="mt-auto w-full lg:px-2 lg:py-3 lg:border-t-1 border-t-black/50">
        <div className="mt-auto">
          {/* <span>UserImage</span> */}
          {/* <span>Name</span>
          <span>Email</span> */}
        </div>
        <ul className="flex flex-col gap-4 xsm:items-center lg:items-start">
          <Link to="/">
            <li className="flex items-center px-4 py-2 gap-2">
              <i className="fa-solid fa-gear sm:text-xl md:text-2xl"></i>
              <span className="xsm:hidden lg:inline">Settings</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center px-4 py-2 gap-2">
              <i className="fa-solid fa-arrow-right-from-bracket sm:text-xl md:text-2xl"></i>
              <span className="xsm:hidden lg:inline">Log out</span>
            </li>
          </Link>
        </ul>
      </footer>
    </nav>
  );
}