import AllJobsContextProvider from "../context/AllJobsContextProvider";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";

const AllJobs: React.FC = () => {
  return (
    <AllJobsContextProvider>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContextProvider>
  );
};

export default AllJobs;
