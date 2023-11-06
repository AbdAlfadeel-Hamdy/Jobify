import React, { useContext, useState } from "react";
import {
  WithRequired,
  FetchQueryOptions,
  QueryKey,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  LoaderFunction,
  redirect,
  // useLoaderData,
  useNavigate,
} from "react-router";
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
  avatar: string;
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
    avatar: "",
  },
  showSidebar: false,
  isDarkTheme: false,
  logoutUser: () => {},
  toggleSidebar: () => {},
  toggleDarkTheme: () => {},
});

/*
1) Without caching by ReactQuery
// export const loader: LoaderFunction = async () => {
//   try {
//     const { data } = await customFetch("/users/current-user");
//     return data;
//   } catch (error) {
//     return redirect("/");
//   }
// };
*/

// 2) Caching by ReactQuery
const userQuery: WithRequired<
  FetchQueryOptions<unknown, unknown, unknown, QueryKey>,
  "queryKey"
> = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};
export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    try {
      return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
      return redirect("/");
    }
  };

export const DashboardContextProvider: React.FC<{
  children: React.ReactNode;
  queryClient: QueryClient;
}> = ({ children, queryClient }) => {
  const navigate = useNavigate();
  // First Approach
  // const { user } = useLoaderData() as { user: User };
  // Second Approach (preferred)
  const {
    data: { user },
  } = useQuery(userQuery) as { data: { user: User } };
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutUser = async () => {
    navigate("/", { replace: true });
    await customFetch("/auth/logout");
    queryClient.removeQueries();
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

export const useDashboardContext = () => useContext(DashboardContext);
