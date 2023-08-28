import React, { useContext, useState } from "react";

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const logoutUser = () => {
    console.log("LogoutUser");
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
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
