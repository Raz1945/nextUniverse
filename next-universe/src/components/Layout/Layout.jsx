import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <main className="main">
      <Outlet/>
    </main>
  )
}
