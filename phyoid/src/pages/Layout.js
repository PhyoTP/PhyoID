import { Outlet, Link } from "react-router-dom";
import "./styles.css"
const Layout = () => {
  return (
    <>
      <header>
        <Link to="/" id="title"><h1>PhyoID</h1></Link>
        <nav>
          <Link to="/login">Log in</Link>
        </nav>
      </header>
      <div className="spacer"></div>
      <Outlet/>
    </>
  )
};

export default Layout;