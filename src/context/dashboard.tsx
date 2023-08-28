import React, { useContext, useState } from "react";
import { isDarkThemeEnabled } from "../App";

interface DashboardContextProps {
  user: { name: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  logoutUser: () => void;
  toggleSidebar: () => void;
  toggleDarkTheme: () => void;
}

const DashboardContext = React.createContext<DashboardContextProps>({
  user: { name: "" },
  showSidebar: false,
  isDarkTheme: false,
  logoutUser: () => {},
  toggleSidebar: () => {},
  toggleDarkTheme: () => {},
});

export const DashboardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const user = { name: "Adham" };
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutUser = () => {};

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", JSON.stringify(newDarkTheme));
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        logoutUser,
        toggleSidebar,
        toggleDarkTheme,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line
export const useDashboardContext = () => useContext(DashboardContext);
