import styled from "styled-components";

interface StatItemProps {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}

const StatItem: React.FC<StatItemProps> = ({
  count,
  title,
  icon,
  color,
  backgroundColor,
}) => {
  return (
    <Wrapper color={color} backgroundColor={backgroundColor}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

interface WrapperProps {
  color: string;
  backgroundColor: string;
}

const Wrapper = styled.article<WrapperProps>`
  padding: 2rem;
  background-color: var(--background-secondary-color);
  border-bottom: 5px solid ${(props) => props.color};
  border-radius: var(--border-radius);
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .count {
    display: block;
    font-size: 50px;
    font-weight: 700;
    color: ${(props) => props.color};
    line-height: 2;
  }
  .icon {
    background-color: ${(props) => props.backgroundColor};
    width: 70px;
    height: 60px;
    display: grid;
    place-items: center;
    border-radius: var(--border-radius);
    svg {
      color: ${(props) => props.color};
      font-size: 2rem;
    }
  }
  .title {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    font-size: 1.25rem;
    text-align: left;
    margin-top: 0.5rem;
  }
`;

export default StatItem;
