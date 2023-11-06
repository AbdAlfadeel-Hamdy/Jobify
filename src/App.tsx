import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
  EditJob,
} from "./pages";

// React Router Loaders and Actions
import { loader as dashboardLoader } from "./context/DashboardContextProvider";
import { loader as allJobsLoader } from "./context/AllJobsContextProvider";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import { ErrorElement } from "./components";

// Setup Dark Theme
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
export const isDarkThemeEnabled = checkDefaultTheme();

// Setup React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Setup React Router
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
        // action: loginAction,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        // element: <DashboardLayout />,
        element: <DashboardLayout queryClient={queryClient} />,
        // loader: dashboardLoader,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            // action: addJobAction
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            // loader: statsLoader,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            // action: profileAction,
            action: profileAction(queryClient),
          },
          { path: "admin", element: <Admin />, loader: adminLoader },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            // action: editJobAction
            action: editJobAction(queryClient),
            loader: editJobLoader,
          },
          {
            path: "delete-job/:id",
            // action: deleteJobAction
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
