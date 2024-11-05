import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from './PhyoID.svg';

const Home = () => {
  const [user, setUser] = useState(null);   // State for storing the user data
  const [error, setError] = useState(null); // State for storing any error messages

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

  // Function to clear the cookie by setting its expiration date to the past
  function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  useEffect(() => {
    // Only fetch user data if cookie exists
    if (document.cookie) {
      const jwt = getCookie('jwt');

      if (jwt === '') {
        setError('An error occurred');
      } else {
        const options = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + jwt
          }
        };

        // Fetch user data using the JWT token
        fetch("https://api.phyotp.dev/phyoid/userdata", options)
          .then(response => {
            if (response.status === 401) {
              // If 422 error, clear the cookie and set an error message
              clearCookie('jwt');
              setError('Session expired. Please log in again.');
            } else {
              return response.json(); // Parse the JSON response if successful
            }
          })
          .then(data => {
            if (data) {
              setUser(data.username); // Store username in state
            }
          })
          .catch(() => {
            setError('An error occurred while fetching user data.');
          });
      }
    }
  }, []); // Empty dependency array to run the effect only once

  // Error message rendering
  if (error) {
    return <h1>{error}</h1>;
  }

  // User greeting when data is fetched
  if (user) {
    return <h1>Hello, {user}</h1>;
  }

  // Main page when no user is logged in (no JWT cookie)
  return (
    <main>
      <Logo style={{ width: "50vmin", height: "50vmin" }} />
      <h1>PhyoID</h1>
      <p>A user management system made by <a href="https://phyotp.dev">PhyoTP</a></p>
    </main>
  );
};

export default Home;
