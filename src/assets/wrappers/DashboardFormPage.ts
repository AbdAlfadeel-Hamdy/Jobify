import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background-color: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    width: 100%;
    max-width: 100%;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
`;

export default Wrapper;
