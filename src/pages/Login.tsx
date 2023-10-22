import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged in Successfully");
    return redirect("/dashboard");
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
    return error;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginTestUser = async () => {
    const data = {
      email: "testuser@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else toast.error("Something went wrong");
    }
  };
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" defaultValue="admin@admin.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <SubmitButton formBtn />
        <button type="button" className="btn btn-block" onClick={loginTestUser}>
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
