import { Form, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { useDashboardContext } from "../context/dashboard";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const AddJob: React.FC = () => {
  const { user } = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <h1>Add Job</h1>
      <Form method="POST" className="form">
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
        <button className="btn btn-form" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default AddJob;
