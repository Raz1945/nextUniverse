import { Link } from "react-router-dom"

export const Welcome = () => {
  return (
    <div>
      <p>
        Welcome to <strong>NextUniverse</strong>
      </p>
      <div>
        <Link to={'/login'}>Sign In</Link>
      </div>
      <div>
        <Link to={'/register'}>Sign Up</Link>

      </div>
    </div>
  )
}
