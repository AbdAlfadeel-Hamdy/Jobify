import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logo, FormRow } from "../components";

const Register: React.FC = () => {
  return (
    <Wrapper>
      <form className="form">
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
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
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
