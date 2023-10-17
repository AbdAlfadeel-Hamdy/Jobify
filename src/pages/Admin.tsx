import { LoaderFunction, redirect, useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from "../components";
import customFetch from "../utils/customFetch";

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await customFetch("/users/admin/app-stats");
    return data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("..");
  }
};

const Admin: React.FC = () => {
  const { users, jobs } = useLoaderData() as { users: number; jobs: number };
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        backgroundColor="#fcefc7"
      />
      <StatItem
        title="total jobs"
        count={jobs}
        icon={<FaCalendarCheck />}
        color="#647acb"
        backgroundColor="#e0e8f9"
      />
    </Wrapper>
  );
};

export default Admin;
