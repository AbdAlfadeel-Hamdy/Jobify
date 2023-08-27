import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormRow, Logo } from "../components";

const Login: React.FC = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" defaultValue="admin@admin.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <button type="submit" className="btn btn-block">
          submit
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
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
    .logo {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.38rem;
    }
    h4 {
      text-align: center;
      margin-bottom: 1.38rem;
    }
    .btn {
      margin-top: 1rem;
    }
    p {
      margin-top: 1rem;
      text-align: center;
      line-height: 1.5;
    }
    .member-btn {
      margin-left: 0.25rem;
      color: var(--primary-500);
      letter-spacing: var(--letter-spacing);
    }
  }
`;

export default Login;
