import { Outlet } from "react-router-dom"
import '../Layout/layout.css'

export const Layout = () => {
  return (
    <main className="layout__wrapper">
      <Outlet/>
    </main>
  )
}

