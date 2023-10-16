import {
  ActionFunction,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboardContext } from "../context/dashboard";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job added successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error((error as any)?.response?.data?.message);
    return error;
  }
};

const AddJob: React.FC = () => {
  const { user } = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
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
          <button className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
