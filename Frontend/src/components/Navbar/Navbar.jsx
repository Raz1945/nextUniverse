import { NavbarMenuItem } from "./components/Navbar.MenuItem";
import { NavbarUserItem } from "./components/Navbar.UserItem";
import './Navbar.css';

export const Navbar = () => {
  // const ranked = Math.floor(Math.random() * 101);
  const ranked = "100";
  const usuario = "JugadorUno";
  const servidor = "Omega";

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
          <NavbarMenuItem item='Opciones' route='Options' />
          <NavbarMenuItem item='Cerrar Sesión' route='logout' />
        </ul>



      </div>
    </nav>
  )
}
