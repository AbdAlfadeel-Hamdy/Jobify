import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../context/DashboardContextProvider";
import links from "../utils/links";

interface NavLinksProps {
  isBigSidebar?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => {
        if (path === "admin" && user.role !== "admin") return null;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
