import { NavLink } from "react-router";
import { useLogoutUser } from "../../api/usersQuery";
import { UserBadge } from "../UserBadge/UserBadge";

// -------------------- Main Login Component --------------------
type SideBarLinkItem = {
  linkText: string,
  linkUrl: string,
  classIcon: string,
  hoverEffect?: boolean,
}

type SideBarButtonProps = {
  linkText: string,
  onClick: () => void,
  classIcon: string,
  hoverEffect?: boolean,
}

// -------------------- Sidebar Component --------------------
export function Sidebar(){
  const logout = useLogoutUser();
  return(
    <nav className="fixed top-0 left-0 h-screen w-12 py-3 sm:w-20 lg:w-64 lg:px-2 bg-gray-200 flex flex-col">
      {/* Logo & Title */}
      <header className="flex gap-4 px-3 py-2 xsm:mb-4 xsm:justify-center">
        <i className="fa-solid fa-list-check xsm:text-2xl md:text-3xl lg:text-3xl" aria-hidden={true}></i>
        <h1 className="font-bold xsm:hidden lg:inline lg:text-2xl">TaskMaster</h1>
      </header>

      {/* Navigation Links */}
      <ul className="flex flex-col h-full gap-4 w-full xsm:items-center lg:items-start">
        <SidebarLinkItem linkText="My Tasks" linkUrl="/settings" classIcon="fa-solid fa-user" hoverEffect={true}/>
        <SidebarLinkItem linkText="Archived Tasks" linkUrl="/settings" classIcon="fa-solid fa-archive" hoverEffect={true}/>
        <SidebarLinkItem linkText="Reminders " linkUrl="/settings" classIcon="fa-solid fa-clock" hoverEffect={true}/>
      </ul>

      {/* User Info */}
      <UserBadge />

      {/* Footer Links */}
      <footer className="mt-auto w-full lg:px-2 lg:py-3 lg:border-t-1 border-t-black/50">
        <section className="flex flex-col gap-4 lg:items-start">
          <SidebarLinkItem linkText="Settings" linkUrl="/settings" classIcon="fa-solid fa-gear" hoverEffect={true}></SidebarLinkItem>
          {/* <SidebarLinkItem linkText="Log Out" linkUrl="/logout" classIcon="fa-solid fa-arrow-right-from-bracket" hoverEffect={true}></SidebarLinkItem> */}
          <SideBarButton linkText="Log Out" classIcon="fa-solid fa-arrow-right-from-bracket" hoverEffect={true} onClick={logout}/>
        </section>
      </footer>
    </nav>
  );
}

// -------------------- Sidebar Link Item Component --------------------
function SidebarLinkItem({linkText, linkUrl, classIcon, hoverEffect}: SideBarLinkItem){
  return(
    <NavLink to={linkUrl} className={`flex justify-center gap-2 w-full py-2 lg:justify-start lg:px-4 ${hoverEffect && 'hover:bg-white hover:rounded-3xl hover:shadow-md'}`}>
        <i className={`${classIcon} sm:text-2xl md:text-2xl`} aria-hidden={true}></i>
        <span className="xsm:hidden lg:inline">{linkText}</span>
    </NavLink>
  );
}

// -------------------- Sidebar Button Component --------------------
function SideBarButton({onClick, linkText, classIcon, hoverEffect}: SideBarButtonProps){
  return(
    <button onClick={onClick} className={`flex justify-center gap-2 w-full py-2 lg:justify-start lg:px-4 ${hoverEffect && 'hover:bg-white hover:rounded-3xl hover:shadow-md hover:cursor-pointer'}`}>
      <i className={`${classIcon} sm:text-2xl md:text-2xl`} aria-hidden={true}></i>
        <span className="xsm:hidden lg:inline">{linkText}</span>
    </button>
  );
}