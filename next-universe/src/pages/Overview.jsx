import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { ResourceManagement } from "../components/Management/ResourceManagement";
import { Menu } from "../components/Menu/Menu";
// import { Layout } from "../components/Layout/Layout";

export const Overview = () => {
  return (
    <>
      <div className="wrapper">
      <ResourceManagement />



      <Menu />


        <Outlet />
      <Navbar />
      </div>
    </>
  );
};
