import { QueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Outlet, useNavigation } from "react-router";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { DashboardContextProvider } from "../context/DashboardContextProvider";

const DashboardLayout: React.FC<{ queryClient: QueryClient }> = ({
  queryClient,
}) => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <DashboardContextProvider queryClient={queryClient}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContextProvider>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default DashboardLayout;
