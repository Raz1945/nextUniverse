import { NavLink, useLocation } from "react-router-dom";

export const NavbarMenuItem = ({ item, route }) => {
  const location = useLocation();
  const isActive = location.pathname === `/${route}`;

  return (
    <li className="navbar__menu-item">
      <NavLink
        to={`/${route}`}
        className="navbar__menu-link"
        aria-current={isActive ? "page" : null}
        role="menuitem"
      >
        <span className="navbar__menu-text">{item}</span>
      </NavLink>
    </li>
  )
}
