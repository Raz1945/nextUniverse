import { Menu } from "../components/Menu/Menu";
import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ResourceManagement } from "../components/Management/ResourceManagement";
import '../styles/main.css'

export const Main = () => {
  return (
    <>
      {/* Indicador de Recuros del jugador */}
      <ResourceManagement />

      <div className="main__wrapper">
        <Menu />
        <Outlet />
      </div>

      {/* Indica el servidor, el nombre y el ranking del usuario */}
      {/* Ademas es donde se encuentran las opciones  */}
      <Navbar />
    </>
  );
};
