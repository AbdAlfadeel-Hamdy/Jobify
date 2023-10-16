import { createContext, useContext } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// eslint-disable-next-line
export const loader = async () => {
  try {
    const { data } = await customFetch("/jobs");
    return { data };
  } catch (error) {
    toast.error((error as any).response.data.message);
    return error;
  }
};

interface AllJobsContextProps {
  data: { jobs: any[] };
}

const AllJobsContext = createContext<AllJobsContextProps>({
  data: { jobs: [] },
});

const AllJobsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useLoaderData() as { data: { jobs: any[] } };

  return (
    <AllJobsContext.Provider value={{ data }}>
      {children}
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
