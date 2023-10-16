import { Form, Link, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Logo, FormRow } from "../components";

// eslint-disable-next-line
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered successfully");
    return redirect("/login");
  } catch (error) {
    toast.error((error as any)?.response?.data?.message);
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

const Wrapper = styled.section`
  height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  form {
    max-width: 400px;
    border-top: 6px solid var(--primary-500);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
  h4 {
    margin-bottom: 1.38rem;
    text-align: center;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Register;
