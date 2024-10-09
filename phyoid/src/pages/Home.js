import { ReactComponent as Logo } from './PhyoID.svg';

const Home = () => {
  // Function to get cookie value by name
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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

  // Function to clear the cookie by setting its expiration date to the past
  function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // If a cookie exists
  if (document.cookie) {
    let user;

    // If 'jwt' cookie doesn't exist or is empty
    if (getCookie('jwt') === '') {
      return (<h1>An error occurred</h1>);
    } else {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getCookie('jwt')
        }
      }

      // Fetch user data using the JWT token
      return fetch("https://phyotp.pythonanywhere.com/api/phyoid/userdata", options)
        .then(response => {
          if (response.status === 422) {
            // If 422 error, clear the cookie and return an error message
            clearCookie('jwt');
            return (<h1>Session expired. Please log in again.</h1>);
          }
          return response.json();  // Parse the JSON response if successful
        })
        .then(data => {
          user = data.username;
          return (
            <h1>hello {user}</h1>
          );
        })
    }
  } else {
    // If no cookie exists, show the main page
    return (
      <main>
        <Logo style={{ width: "50vmin", height: "50vmin" }} />
        <h1>PhyoID</h1>
        <p>A user management system made by <a href="phyotp.dev">PhyoTP</a></p>
      </main>
    );
  }
}

export default Home;
