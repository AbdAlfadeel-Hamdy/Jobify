import React, { useContext, useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { isDarkThemeEnabled } from "../App";
import customFetch from "../utils/customFetch";

interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  location: string;
  role: "user" | "admin";
}

interface DashboardContextProps {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  logoutUser: () => void;
  toggleSidebar: () => void;
  toggleDarkTheme: () => void;
}

const DashboardContext = React.createContext<DashboardContextProps>({
  user: {
    _id: "",
    name: "",
    lastName: "",
    email: "",
    location: "",
    role: "user",
  },
  showSidebar: false,
  isDarkTheme: false,
  logoutUser: () => {},
  toggleSidebar: () => {},
  toggleDarkTheme: () => {},
});

// eslint-disable-next-line
export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export const DashboardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useLoaderData() as { user: User };
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutUser = async () => {
    navigate("/", { replace: true });
    await customFetch("/auth/logout");
    toast.success("Logging out...");
  };

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
