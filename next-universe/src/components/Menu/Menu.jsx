import { Link } from "react-router-dom";
// import './menu.css'
export const Menu = () => {


  return (
    <div className="menu__list_wrap">

      <ul className="menu__content">
        <li className="menu__item">
          <Link to='/overview'>Overview</Link>
        </li>
        <li>
          <Link to='/overview/installations'>Installation</Link>
        </li>
        <li>
          <Link to='/research'>Research</Link>
        </li>
        <li>
          <Link to='/overview/hangar'>Hangar</Link>
        </li>
        <li>
          <Link to='/defense'>Defense</Link>
        </li>
        <li>
          <Link to='/fleet'>Fleet</Link>
        </li>
        <li>
          <Link to='/alliance'>Alliance</Link>
        </li>
        <li>
          <Link to='/galaxy'>Galaxy</Link>
        </li>
        <li>
          <Link to='/empire'>Empire</Link>
        </li>
        <li>
          <Link to='/store'>Store</Link>
        </li>
      </ul>
    </div>

  );
};
