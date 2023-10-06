import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  HomeLayout,
  Landing,
  Login,
  Register,
  ErrorPage,
  Admin,
  AddJob,
  Stats,
  AllJobs,
  Profile,
} from "./pages";

import { action as registerAction } from "./pages/Register";

const checkDefaultTheme = () => {
  const darkThemeString = localStorage.getItem("darkTheme");
  let darkTheme;
  try {
    darkTheme = darkThemeString ? JSON.parse(darkThemeString) : false;
  } catch (error) {
    console.log(error);
    darkTheme = false;
  }
  document.body.classList.toggle("dark-theme", darkTheme);

  return darkTheme;
};

// eslint-disable-next-line
export const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AddJob /> },
          { path: "stats", element: <Stats /> },
          { path: "all-jobs", element: <AllJobs /> },
          { path: "profile", element: <Profile /> },
          { path: "admin", element: <Admin /> },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
