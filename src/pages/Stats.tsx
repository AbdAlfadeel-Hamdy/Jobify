import { LoaderFunction, redirect, useLoaderData } from "react-router";
import { toast } from "react-toastify";
import {
  ChartsContainer,
  MonthlyApplications,
  StatsContainer,
  StatsType,
} from "../components";
import customFetch from "../utils/customFetch";

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  } catch (error) {
    toast.error("Something went wrong");
    return redirect("/");
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
