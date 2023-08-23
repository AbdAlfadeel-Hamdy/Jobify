import { Outlet } from "react-router-dom";

const HomeLayout: React.FC = () => {
  return (
    <div>
      <nav>Nav Links</nav>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
