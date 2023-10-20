import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";
import { Logo, FormRow } from "../components";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered successfully");
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
    return error;
  }
};

const Register: React.FC = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="gonzalo" />
        <FormRow
          type="text"
          label="last name"
          name="lastName"
          defaultValue="hamdy"
        />
        <FormRow type="text" name="location" defaultValue="egypt" />
        <FormRow type="email" name="email" defaultValue="test@test.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
