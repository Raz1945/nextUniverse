import { Menu } from "../components/Menu/Menu";
import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ResourceManagement } from "../components/Management/ResourceManagement";
import '../styles/main.css'

export const Main = () => {
  return (
    <>
      <ResourceManagement />

      <div className="main__wrapper">
        <Menu />
        <Outlet />
      </div>




      <Navbar />
    </>
  );
};
