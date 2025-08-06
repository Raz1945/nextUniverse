import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css';

// Lista de rutas del menú con tecla asignada
const menuItems = [
  { path: '/main', label: 'Overview', key: 'O' },
  { path: '/main/installations', label: 'Installation', key: 'I' },
  { path: '/main/research', label: 'Research', key: 'R' },
  { path: '/main/hangar', label: 'Hangar', key: 'H' },
  { path: '/main/defense', label: 'Defense', key: 'D' },
  { path: '/main/fleet', label: 'Fleet', key: 'F' },
  { path: '/main/alliance', label: 'Alliance', key: 'A' },
  { path: '/main/galaxy', label: 'Galaxy', key: 'G' },
  { path: '/main/empire', label: 'Empire', key: 'E' },
  { path: '/main/store', label: 'Store', key: 'S' },
];

export const Menu = () => {
  const navigate = useNavigate();
useEffect(() => {
  const handleKeyDown = (e) => {
    // Ignora si el usuario está escribiendo en un input/textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // Ignora combinaciones con teclas modificadoras
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const pressedKey = e.key.toUpperCase();
    const item = menuItems.find((i) => i.key === pressedKey);
    if (item) {
      e.preventDefault(); // Solo previene si se va a navegar
      navigate(item.path);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [navigate]);


  return (
    <div className='menu__wrapper border-right-to-bottom'>
      <ul className='menu__list_content'>
        {/* Renderiza cada ítem del menú dinámicamente */}
        {menuItems.map((item) => (
          <li className='menu__item' key={item.path}>
            <Link to={item.path} className='menu__item-link'>
              {item.label} <span className="menu__shortcut">[{item.key}]</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
