import { useNavigation } from "react-router";
import AllJobsContextProvider from "../context/allJobs";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";

const AllJobs: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <AllJobsContextProvider>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <SearchContainer />
          <JobsContainer />
        </>
      )}
    </AllJobsContextProvider>
  );
};

export default AllJobs;
