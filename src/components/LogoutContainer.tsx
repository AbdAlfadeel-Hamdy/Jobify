import { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { useDashboardContext } from "../context/dashboard";

const LogoutContainer: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout((prevState) => !prevState)}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            className="img"
            alt={`Avatar of ${user.name}`}
          />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    width: 100%;
    box-shadow: var(--shadow-2);
    visibility: hidden;
    border-radius: var(--border-radius);
    background-color: var(--primary-500);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    width: 100%;
    cursor: pointer;
  }
`;

export default LogoutContainer;
