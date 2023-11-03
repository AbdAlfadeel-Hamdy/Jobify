import { LoaderFunction, useLoaderData } from "react-router";
import {
  ChartsContainer,
  MonthlyApplications,
  StatsContainer,
  StatsType,
} from "../components";
import customFetch from "../utils/customFetch";

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await customFetch.get("/jos/stats");
    return data;
  } catch (error) {
    return error;
  }
};

const Stats: React.FC = () => {
  const { defaultStats, monthlyApplicationsFormatted } = useLoaderData() as {
    defaultStats: StatsType;
    monthlyApplicationsFormatted: MonthlyApplications[];
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
