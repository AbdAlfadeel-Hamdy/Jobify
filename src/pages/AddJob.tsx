import { ActionFunction, Form, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDashboardContext } from "../context/DashboardContextProvider";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitButton } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";

export const action =
  (queryClient: QueryClient): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job added successfully");
      return redirect("all-jobs");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else toast.error("Something went wrong");
      return error;
    }
  };

const AddJob: React.FC = () => {
  const { user } = useDashboardContext();
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow name="position" />
          <FormRow name="company" />
          <FormRow
            name="jobLocation"
            label="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            label="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            label="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
