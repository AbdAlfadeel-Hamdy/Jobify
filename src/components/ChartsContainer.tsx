import { useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

export interface MonthlyApplications {
  count: number;
  date: string;
}

export interface ChartsProps {
  data: MonthlyApplications[];
}

const ChartsContainer: React.FC<ChartsProps> = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Charts</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  h4 {
    margin-bottom: 0.75rem;
  }
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

export default ChartsContainer;
