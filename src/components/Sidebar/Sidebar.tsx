import { NavLink } from "react-router";
import { UserBadge } from "../UserBadge/UserBadge";
import type { FetchListsResponse } from "../../types";
// -------------------- Types --------------------
type SideBarLinkItem = {
  linkText: string,
  linkUrl: string,
  classIcon: string,
  indexListColor?: string,
  hoverEffect?: boolean,
}

type SideBarButtonProps = {
  linkText: string,
  onClick: () => void,
  classIcon: string,
  hoverEffect?: boolean,
}

type SidebarProps = {
  onLogout: () => void,
  meData: any,
  isMeDataLoading: boolean,
  isMeDataError: boolean,
  listsData: FetchListsResponse | undefined,
  isListsLoading: boolean,
  isListsError: boolean,
  onCreateList: () => void,
}

// -------------------- Sidebar Component --------------------
/**
 * Sidebar
 * Primary navigation sidebar that shows global links and the user's lists.
 * Props include callbacks and query results for user and lists.
 *
 * @param {() => void} onLogout - logout callback
 * @param {any} meData - current user data
 * @param {boolean} isMeDataLoading - loading flag for user data
 * @param {boolean} isMeDataError - error flag for user data
 * @param {FetchListsResponse | undefined} listsData - lists query data
 * @param {boolean} isListsLoading - loading flag for lists
 * @param {boolean} isListsError - error flag for lists
 * @param {() => void} onCreateList - callback to open create list modal
 */
export function Sidebar({ onLogout, meData, isMeDataLoading, isMeDataError, listsData, isListsLoading, isListsError, onCreateList }: SidebarProps){
  return(
    <nav className="fixed top-0 left-0 h-screen w-12 py-3 sm:w-20 lg:w-64 lg:px-2 bg-white flex flex-col">
      {/* Logo & Title */}
      <header className="flex gap-4 px-3 py-2 xsm:mb-4 xsm:justify-center">
        <i className="fa-solid fa-list-check xsm:text-2xl md:text-3xl lg:text-3xl" aria-hidden={true}></i>
        <h1 className="font-bold xsm:hidden lg:inline lg:text-2xl">TaskMaster</h1>
      </header>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4 w-full xsm:items-center lg:items-start">
        <SidebarLinkItem linkText="All My Tasks" linkUrl={meData?.id ? `/accounts/${meData.id}` : '/'} classIcon="fa-solid fa-user" hoverEffect={true}/>
        <SidebarLinkItem linkText="Archived Tasks" linkUrl="/settings" classIcon="fa-solid fa-archive" hoverEffect={true}/>
        <SidebarLinkItem linkText="Reminders " linkUrl="/settings" classIcon="fa-solid fa-clock" hoverEffect={true}/>
      </ul>

      <hr className="mt-2 mb-3"/>

      {/* Lists header */}
      <header className="flex justify-center items-center px-3 py-2 lg:justify-between">
        <span className="text-sm text-gray-500 font-semibold xsm:hidden lg:flex">MY LISTS</span>
        <button onClick={onCreateList} className="group hover:cursor-pointer hover:text-gray-700">
          <i className="fa-solid fa-plus text-gray-500 group-hover:text-gray-700 xsm:text-lg sm:text-2xl lg:text-lg"></i>
        </button>
      </header>

      {/* Lists: loading / error / items */}
      <ul className="flex flex-col h-full w-full gap-3 xsm:items-center lg:items-start overflow-auto">
        {isListsLoading && 
          <div className="flex gap-3 w-full justify-center xsm:items-center lg:items-start">
            <div className="bg-gray-400 rounded-full animate-pulse xsm:h-3 xsm:w-3 md:h-4 md:w-4"></div>
            <div className="bg-gray-400 rounded-full animate-pulse w-full h-4 xsm:hidden lg:flex"></div>
          </div>}
        {isListsError && 
          <div className="flex gap-3 w-full justify-center xsm:items-center lg:items-start">
            <div className="bg-gray-600 rounded-full xsm:h-3 xsm:w-3 md:h-4 md:w-4"></div>
            <div className="bg-gray-600 rounded-full w-full h-4 xsm:hidden lg:flex"></div>
          </div>}
          {listsData && listsData.lists?.map((list) => (
            <SidebarLinkItem key={list.id} linkText={list.title} linkUrl={`lists/${list.id}`} indexListColor={list.color} classIcon={`rounded-full xsm:h-3 xsm:w-3 lg:h-2 lg:w-2`} hoverEffect={true}/>
          ))}
      </ul>

      {/* User Info */}
      <UserBadge userData={meData || {}} isLoading={isMeDataLoading} isError={isMeDataError} />

      {/* Footer Links */}
      <footer className="w-full lg:px-2 pb-2">
        <section className="flex flex-col gap-2 lg:items-start">
          <SidebarLinkItem linkText="Settings" linkUrl="/settings" classIcon="fa-solid fa-gear" hoverEffect={true}></SidebarLinkItem>
          <SideBarButton linkText="Log Out" classIcon="fa-solid fa-arrow-right-from-bracket" hoverEffect={true} onClick={onLogout}/>
        </section>
      </footer>
    </nav>
  );
}

// -------------------- Sidebar Link Item Component --------------------
function SidebarLinkItem({linkText, linkUrl, classIcon, hoverEffect, indexListColor}: SideBarLinkItem){
  return(
    <NavLink to={linkUrl} end={true} className={({ isActive }) =>
        `flex justify-center items-center gap-4 w-full py-2 lg:justify-start lg:px-4
         ${isActive ? 'rounded-xl bg-gray-200 text-black' : 'text-gray-600'}
         ${hoverEffect ? 'hover:rounded-xl hover:bg-gray-200 hover:text-black' : ''}`
      }
    >
        <i className={`${classIcon} sm:text-2xl md:text-2xl`} aria-hidden={true} style={{ backgroundColor: indexListColor }}></i>
        <span className="xsm:hidden lg:inline">{linkText}</span>
    </NavLink>
  );
}

// -------------------- Sidebar Button Component --------------------
function SideBarButton({onClick, linkText, classIcon, hoverEffect}: SideBarButtonProps){
  return(
    <button onClick={onClick} className={`flex justify-center gap-2 w-full py-2 text-gray-600 lg:justify-start lg:px-4 ${hoverEffect && 'hover:cursor-pointer hover:rounded-xl hover:bg-gray-200 hover:text-black'}`}>
      <i className={`${classIcon} sm:text-2xl md:text-2xl`} aria-hidden={true}></i>
        <span className="xsm:hidden lg:inline">{linkText}</span>
    </button>
  );
}