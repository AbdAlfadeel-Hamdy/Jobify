import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { Job } from "../utils/interfaces";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";

export const loader: LoaderFunction = async ({ params: { id } }) => {
  try {
    const { data } = await customFetch(`/jobs/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
    return redirect("../all-jobs");
  }
};

export const action: ActionFunction = async ({ request, params: { id } }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${id}`, data);
    toast.success("Job edited successfully");
    return redirect("../all-jobs");
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
    return error;
  }
};

const EditJob: React.FC = () => {
  const { job } = useLoaderData() as { job: Job };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            label="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            label="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            label="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <button className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
