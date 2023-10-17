import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged in Successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error((error as any).response.data.message);
    return error;
  }
};

const Login: React.FC = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" defaultValue="admin@admin.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
