import styled from "styled-components";
import { useAllJobsContext } from "../context/allJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer: React.FC = () => {
  const {
    data: { jobs, totalJobs, numOfPages },
  } = useAllJobsContext();

  if (totalJobs === 0)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default JobsContainer;
