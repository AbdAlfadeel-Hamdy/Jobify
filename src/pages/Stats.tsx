import {
  LoaderFunction,
  // useLoaderData
} from "react-router";
import {
  QueryClient,
  WithRequired,
  FetchQueryOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import {
  ChartsContainer,
  MonthlyApplications,
  StatsContainer,
  StatsType,
} from "../components";
import customFetch from "../utils/customFetch";

/*
1) Without caching by ReactQuery
export const loader: LoaderFunction = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
    // Optional
  } catch (error) {
    return error;
  }
};
*/

// 2) Caching by ReactQuery
const statsQuery: WithRequired<
  FetchQueryOptions<unknown, unknown, unknown, QueryKey>,
  "queryKey"
> = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  },
};
export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async () =>
    await queryClient.ensureQueryData(statsQuery);

const Stats: React.FC = () => {
  // First Approach
  // const { defaultStats, monthlyApplicationsFormatted } = useLoaderData() as {
  //   defaultStats: StatsType;
  //   monthlyApplicationsFormatted: MonthlyApplications[];
  // };
  // Second Approach (preferred)
  const {
    data: { defaultStats, monthlyApplicationsFormatted },
  } = useQuery(statsQuery) as {
    data: {
      defaultStats: StatsType;
      monthlyApplicationsFormatted: MonthlyApplications[];
    };
  };
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplicationsFormatted?.length && (
        <ChartsContainer data={monthlyApplicationsFormatted} />
      )}
    </>
  );
};

export default Stats;
