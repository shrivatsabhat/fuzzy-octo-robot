import { Link, Outlet } from "react-router-dom"

export const Nav = () => {
  return <>
    <header>
      <Link to={'./'}>News Aggregator</Link>
    </header>
    <hr />
    <Outlet />
  </>
}