import { Link } from 'react-router-dom';
import './menu.css';

export const Menu = () => {
  return (
    <div className='menu__wrapper border-right-to-bottom'>
      <ul className='menu__list_content'>
        <li className='menu__item'>
          <Link to='/main' className='menu__item-link'>
            Overview
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/main/installations' className='menu__item-link'>
            Installation
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/research' className='menu__item-link'>
            Research
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/main/hangar' className='menu__item-link'>
            Hangar
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/defense' className='menu__item-link'>
            Defense
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/fleet' className='menu__item-link'>
            Fleet
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/alliance' className='menu__item-link'>
            Alliance
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/galaxy' className='menu__item-link'>
            Galaxy
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/empire' className='menu__item-link'>
            Empire
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/store' className='menu__item-link'>
            Store
          </Link>
        </li>
      </ul>
    </div>
  );
};
