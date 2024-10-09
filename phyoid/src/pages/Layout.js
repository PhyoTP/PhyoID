import { Outlet, Link } from "react-router-dom";
import "./styles.css";
import { ReactComponent as Logo } from './PhyoID.svg';

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/" id="title">
          {/* Inline styling for the SVG */}
          <Logo style={{ outline: "2px solid #D4AF37", width: "50px", height: "50px", borderRadius: "100px" }} />
          <h1>PhyoID</h1>
        </Link>
        <nav>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      <div className="spacer" />
      <div className="container">
        <Outlet />
      </div>
      <footer>
        <section>
          <h2>PhyoID Apps</h2>
          <nav>
            <a href="https://multicards.phyotp.dev">Multicards</a>
          </nav>
        </section>
        <section>
          <h2>Developer</h2>
          <nav>
            <a href="https://phyotp.dev">PhyoTP</a>
          </nav>
        </section>
      </footer>
    </>
  );
};

export default Layout;
