import { Outlet } from "react-router-dom"
import '../styles/welcome.css'
export const Welcome = () => {
  return (
    <div className="welcome__wrapper">
      <picture className="welcome__picture">
        <img src="../pictures/NextU-Portada_14.jpeg" alt="" className="welcome__img" />
        </picture>
      <Outlet />
    </div>
  )
}
