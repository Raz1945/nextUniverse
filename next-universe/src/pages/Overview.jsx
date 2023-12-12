import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { ResourceManagement } from "../components/Management/ResourceManagement";

export const Overview = () => {

  return (
    <>
      <Navbar />
      <ResourceManagement />
    
      <div className="container">
      <ul>
        <li>
          <Link to='/overview' >Overview</Link>
        </li>
        <li>
          <Link to='/installations' >Installation</Link>
        </li>
      </ul>
      </div>

    </>
  );
};
