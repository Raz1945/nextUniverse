import { NavLink, useLocation } from "react-router-dom";

export const NavbarUserItem = ({ item, itemValue, route, otherClass }) => {
  const location = useLocation();
  const isActive = location.pathname === `/${route}`;

  return (
    <li className="navbar__user-item">
      <NavLink
        to={`/${route}`}
        className="navbar__user-value"
        aria-current={isActive ? "page" : null}
        role="menuitem"
      >
        <span className="navbar__user-text">{item}</span>
        <span className={`navbar__user-text-value ${otherClass}`}>{itemValue}</span>
      </NavLink>
    </li>
  )
}
