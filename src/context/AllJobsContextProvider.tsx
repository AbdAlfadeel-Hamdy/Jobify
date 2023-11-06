import { createContext, useContext } from "react";
import { LoaderFunction, useLoaderData } from "react-router";
import {
  QueryClient,
  WithRequired,
  FetchQueryOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { Job } from "../utils/interfaces";
import { JOB_SORT_BY } from "../utils/constants";

const allJobsQuery = (
  params: any
): WithRequired<
  FetchQueryOptions<unknown, unknown, unknown, QueryKey>,
  "queryKey"
> => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    // Another Solution for getting Params
    // const paramsEntries =
    //   request.url
    //     .split("?")[1]
    //     ?.split("&")
    //     .map((queryParam) => queryParam.split("=")) || [];
    // const params = Object.fromEntries(paramsEntries);

    // 1) Without caching by ReactQuery
    // const { data } = await customFetch("/jobs", {
    //   params,
    // });
    // return { data, searchValues: params };

    // 2) Caching by ReactQuery
    console.log(params);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: params };
  };

interface JobsInfo {
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  currentPage: number;
}

interface Params {
  search: string;
  jobStatus: string;
  jobType: string;
  sort: string;
}

interface AllJobsContextProps {
  data: JobsInfo;
  searchValues: Params;
}

const AllJobsContext = createContext<AllJobsContextProps>({
  data: {
    jobs: [],
    totalJobs: 1,
    numOfPages: 1,
    currentPage: 1,
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
  const { searchValues } = useLoaderData() as AllJobsContextProps;
  const { data } = useQuery(allJobsQuery(searchValues)) as {
    data: JobsInfo;
  };

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      {children}
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
