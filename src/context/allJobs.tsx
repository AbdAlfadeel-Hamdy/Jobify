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

export interface Job {
  _id: string;
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  jobLocation: string;
  createdAt: Date;
}

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

// eslint-disable-next-line
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
