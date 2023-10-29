import { createContext, useContext } from "react";
import { LoaderFunction, useLoaderData } from "react-router";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";
import { Job } from "../utils/interfaces";
import { JOB_SORT_BY } from "../utils/constants";

export const loader: LoaderFunction = async ({ request }) => {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  // Another Solution
  // const paramsEntries =
  //   request.url
  //     .split("?")[1]
  //     ?.split("&")
  //     .map((queryParam) => queryParam.split("=")) || [];
  // const params = Object.fromEntries(paramsEntries);
  try {
    const { data } = await customFetch("/jobs", {
      params,
    });
    return { data, searchValues: params };
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
    return error;
  }
};

interface Params {
  search: string;
  jobStatus: string;
  jobType: string;
  sort: string;
}

interface AllJobsContextProps {
  data: { jobs: Job[] };
  searchValues: Params;
}

const AllJobsContext = createContext<AllJobsContextProps>({
  data: {
    jobs: [],
  },
  searchValues: {
    search: "",
    jobStatus: "all",
    jobType: "all",
    sort: JOB_SORT_BY.NEWEST_FIRST,
  },
});

const AllJobsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, searchValues } = useLoaderData() as {
    data: { jobs: Job[] };
    searchValues: Params;
  };

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      {children}
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
