import { createContext, useContext } from "react";
import { LoaderFunction, useLoaderData } from "react-router";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Job } from "../utils/interfaces";

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await customFetch("/jobs");
    return { data };
  } catch (error) {
    toast.error((error as any).response.data.message);
    return error;
  }
};

interface AllJobsContextProps {
  data: { jobs: Job[] };
}

const AllJobsContext = createContext<AllJobsContextProps>({
  data: { jobs: [] },
});

const AllJobsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useLoaderData() as { data: { jobs: Job[] } };

  return (
    <AllJobsContext.Provider value={{ data }}>
      {children}
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
