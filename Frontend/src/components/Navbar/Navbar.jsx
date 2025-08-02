import { NavbarMenuItem } from "./components/Navbar.MenuItem";
import { NavbarUserItem } from "./components/Navbar.UserItem";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const ranked = "100";
  const servidor = "Omega";
  const usuario = auth?.user || "Invitado";
  // console.log('Usuario actual:', usuario);

  // Función de logout
  const handleLogout = () => {
    setAuth(null); // Limpiar auth del contexto y localStorage
    navigate('/welcome/login'); // Redirigir al login
  };

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <ul className="navbar__user">
          <NavbarUserItem item='Servidor:' itemValue={servidor} route='Server' />
          <NavbarUserItem item='Usuario:' itemValue={usuario} route='User' />
          <NavbarUserItem item='Calificacion:' itemValue={ranked} route='Ranked' otherClass={'navbar__user_value--ranked'} />
        </ul>

        <ul className="navbar__menu">
          <NavbarMenuItem item='Amigos' route='Friends' />
          <NavbarMenuItem item='Notas' route='Notes' />
          <NavbarMenuItem item='Ayuda' route='Ayuda' />
          <NavbarMenuItem item='Opciones' route='Options' />
          <NavbarMenuItem item='Cerrar Sesión' onClick={handleLogout} />
        </ul>
      </div>
    </nav>
  );
};
