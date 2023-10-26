import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { StatItem } from ".";
import Wrapper from "../assets/wrappers/StatsContainer";

export interface StatsType {
  pending: number;
  interview: number;
  declined: number;
}
interface StatsContainerProps {
  defaultStats: StatsType;
}

const StatsContainer: React.FC<StatsContainerProps> = ({ defaultStats }) => {
  const stats = [
    {
      count: defaultStats.pending || 0,
      title: "pending applications",
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      backgroundColor: "#fef3c7",
    },
    {
      count: defaultStats.interview || 0,
      title: "interviews scheduled",
      icon: <FaCalendarCheck />,
      color: "#647acb",
      backgroundColor: "#e0e8f9",
    },
    {
      count: defaultStats.declined || 0,
      title: "jobs declined",
      icon: <FaBug />,
      color: "#d66a6a",
      backgroundColor: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((stat) => (
        <StatItem key={stat.title} {...stat} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
