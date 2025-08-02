import { NavLink, useLocation } from "react-router-dom";

export const NavbarMenuItem = ({ item, route, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === `/${route}`;

  return (
    <li className="navbar__menu-item">
      {onClick ? (
        // Si tiene onClick, renderiza un <span> clickeable
        <span className="navbar__menu-link" onClick={onClick} role="menuitem">
          <span className="navbar__menu-text">{item}</span>
        </span>
      ) : (
        // Si no tiene onClick, usa NavLink normalmente
        <NavLink
          to={`/${route}`}
          className="navbar__menu-link"
          aria-current={isActive ? "page" : null}
          role="menuitem"
        >
          <span className="navbar__menu-text">{item}</span>
        </NavLink>
      )}
    </li>
  );
};
