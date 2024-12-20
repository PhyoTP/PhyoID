import { Outlet, Link } from "react-router-dom";
import "./styles.css";
import { ReactComponent as Logo } from './PhyoID.svg';
const Layout = () => {
  // Function to clear the cookie by setting its expiration date to the past
  function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();  // Reload the page to reflect the change
    console.log("logged out")
  }
  // Function to get cookie value by name
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
  
    const password = window.prompt("Enter password to continue:");
    if (!password) return;
  
    const jwt = getCookie('jwt');
    if (jwt === "") {
      alert("You are not logged in. Please log in and try again.");
      return;
    }
  
    const deletePublicData = window.confirm("Would you like to delete your public data as well?");
    try {
      // Handle public data deletion or renaming
      const publicDataEndpoint = deletePublicData 
        ? "https://api.phyotp.dev/multicards/user/delete" 
        : "https://api.phyotp.dev/multicards/user/sets_rename";
  
      const publicDataOptions = {
        method: deletePublicData ? 'DELETE' : 'PUT',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      };
  
      const publicDataResponse = await fetch(publicDataEndpoint, publicDataOptions);
      if (!publicDataResponse.ok) {
        const error = await publicDataResponse.json();
        console.error(error.message || "Public data operation failed.");
        alert(error.message || "Unable to manage public data.");
        return;
      }
  
      // Handle account deletion
      const accountData = { password };
      const accountOptions = {
        method: 'POST',
        body: JSON.stringify(accountData),
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      };
  
      const accountResponse = await fetch("https://api.phyotp.dev/phyoid/delete", accountOptions);
      if (accountResponse.ok) {
        const message = await accountResponse.json();
        alert(message.message || "Account deleted successfully.");
        clearCookie('jwt'); // Log the user out
      } else if (accountResponse.status === 401) {
        alert("Password incorrect.");
      } else {
        const error = await accountResponse.json();
        alert(error.message || "Unable to delete account.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  
  
  return (
    <>
      <header>
        <Link to="/" id="title">
          {/* Inline styling for the SVG */}
          <Logo style={{ outline: "2px solid #D4AF37", width: "50px", height: "50px", borderRadius: "100px" }} />
          <h1>PhyoID</h1>
        </Link>
        <nav className="expand">
          { 
            document.cookie === "" ?
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
            :
            // Properly space the buttons
            <div className="expand">
              <button onClick={() => clearCookie("jwt")}>Log out</button>
              <div style={{flexGrow: "1"}} />
              <button onClick={deleteAccount} style={{color: "#D43745"}}>Delete your account</button>
            </div>
          }
        </nav>
      </header>
      <div id="vertSpacer" />
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
