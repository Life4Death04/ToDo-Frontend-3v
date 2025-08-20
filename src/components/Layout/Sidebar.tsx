/**
 * TODO:
 * Create NavBar Component
 *  |-Add Logo
 *  |--Add nav links
 *  |--Add User Avatar
 *  |--Add Log Out link
 * Create TaskStorage Component
 * Create MyTasks component
 */

import { Link } from "react-router";

export function Sidebar(){
  return(
    <nav className="fixed top-0 left-0 h-screen w-12 py-3 sm:w-20 lg:w-64 lg:px-2 bg-gray-200 flex flex-col">
      <header className="flex gap-4 px-3 py-2 xsm:mb-4 xsm:justify-center">
        <i className="fa-solid fa-list-check xsm:text-2xl md:text-3xl lg:text-3xl"></i>
        <h1 className="font-bold xsm:hidden lg:inline lg:text-2xl">TaskMaster</h1>
      </header>
      <ul className="flex flex-col h-full gap-4 w-full xsm:items-center lg:items-start">
        <SidebarLinkItem linkText="My Tasks" linkUrl="/settings" classIcon="fa-solid fa-user" hoverEffect={true}/>
        <SidebarLinkItem linkText="Shared Tasks" linkUrl="/settings" classIcon="fa-solid fa-archive" hoverEffect={true}/>
        <SidebarLinkItem linkText="Archived Tasks" linkUrl="/settings" classIcon="fa-solid fa-clock" hoverEffect={true}/>
      </ul>
      <div className="relative w-full p-1 rounded-4xl mb-4 lg:bg-amber-200">
        <div className="aspect-square xsm:w-8 sm:w-12 lg:w-14 rounded-3xl mx-auto lg:m-0 xsm:outline-4 xsm:outline-amber-200 lg:outline-0">
          <img src="https://imgs.search.brave.com/91UaRWoJ6GVVcNlXKts7R56v_b3bFixb4RO8DDuRhco/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mYWtl/cGVyc29uLWZhY2Uu/b3NzLXVzLXdlc3Qt/MS5hbGl5dW5jcy5j/b20vRmFjZS9tYWxl/L21hbGUxMDg1MzI0/NDYwMjA1LmpwZw" alt="User Image" className="w-full h-full rounded-full object-cover"/>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-17 flex flex-col items-center xsm:hidden lg:inline-block lg:items-start">
          <p className="text-[10px] font-bold capitalize">santiago rodriguez</p>
          <p className="text-[10px] font-bold underline truncate overflow-hidden whitespace-nowrap max-w-3/4">santiagoroasdfasfdriguez@gmail.com</p>
        </div>
      </div>
      <footer className="mt-auto w-full lg:px-2 lg:py-3 lg:border-t-1 border-t-black/50">
        <ul className="flex flex-col gap-4 lg:items-start">
          <SidebarLinkItem linkText="Settings" linkUrl="/settings" classIcon="fa-solid fa-gear" hoverEffect={true}></SidebarLinkItem>
          <SidebarLinkItem linkText="Log Out" linkUrl="/logout" classIcon="fa-solid fa-arrow-right-from-bracket" hoverEffect={true}></SidebarLinkItem>
        </ul>
      </footer>
    </nav>
  );
}

type SideBarLinkItem = {
  linkText: string,
  linkUrl: string,
  classIcon: string,
  hoverEffect?: boolean,
}

function SidebarLinkItem({linkText, linkUrl, classIcon, hoverEffect}: SideBarLinkItem){
  return(
    <Link to={linkUrl} className="w-full">
      <li className={`flex justify-center gap-2 py-2 lg:justify-start lg:px-4 ${hoverEffect && 'hover:bg-white hover:rounded-3xl hover:shadow-md'}`}>
        <i className={`${classIcon} sm:text-2xl md:text-2xl`}></i>
        <span className="xsm:hidden lg:inline">{linkText}</span>
      </li>
    </Link>
  );
}