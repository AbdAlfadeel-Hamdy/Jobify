import { ChangeEvent } from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants";
import { useAllJobsContext } from "../context/AllJobsContextProvider";

const SearchContainer: React.FC = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();

  const debounce = () => {
    let timeout: number;
    return (e: ChangeEvent) => {
      const { form } = e.currentTarget as HTMLInputElement;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (form) submit(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            required={false}
            defaultValue={searchValues.search}
            onChange={debounce()}
          />
          <FormRowSelect
            name="jobStatus"
            label="job status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={searchValues.jobStatus}
            onChange={(e) => submit((e.currentTarget as HTMLInputElement).form)}
          />
          <FormRowSelect
            name="jobType"
            label="job type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={searchValues.jobType}
            onChange={(e) => submit((e.currentTarget as HTMLInputElement).form)}
          />
          <FormRowSelect
            name="sort"
            list={Object.values(JOB_SORT_BY)}
            defaultValue={searchValues.sort}
            onChange={(e) => submit((e.currentTarget as HTMLInputElement).form)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
