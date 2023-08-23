import { useRouteError } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Error Page</h1>
    </div>
  );
};

export default Error;
