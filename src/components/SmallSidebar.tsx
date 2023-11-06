// import styled from "styled-components";
import Wrapper from "../assets/wrappers/SmallSidebar.ts";
import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../context/DashboardContextProvider.tsx";
import Logo from "./Logo";
import NavLinks from "./NavLinks.tsx";

const SmallSidebar: React.FC = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
