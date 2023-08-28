import styled from "styled-components";
import { useDashboardContext } from "../context/dashboard";

const SmallSidebar: React.FC = () => {
  const { user } = useDashboardContext();
  console.log(user);
  return <Wrapper>Small Sidebar</Wrapper>;
};

const Wrapper = styled.div``;

export default SmallSidebar;
