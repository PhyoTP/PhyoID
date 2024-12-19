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
              // If 401 error, clear the cookie and set an error message
              clearCookie('jwt');
              setError('Session expired. Please log in again.');
            } else {
              return response.json(); // Parse the JSON response if successful
            }
          })
          .then(data => {
            if (data) {
              setUser(data); // Store username in state
            }
          })
          .catch(() => {
            setError('An error occurred while fetching user data.');
          });
      }
    }
  }, []); // Empty dependency array to run the effect only once
  const handleDownload = () => {

    // Convert data to JSON string
    const jsonData = JSON.stringify(user, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_data.json"; // Set the file name

    // Programmatically click the link to trigger the download
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };
  // Error message rendering
  if (error) {
    return <h1>{error}</h1>;
  }

  // User greeting when data is fetched
  if (user) {
    return (
      <main>
        <h1>Hello, {user.username}</h1>
        <section>
          <button onClick={handleDownload} className="stuff">Download your data</button>
        </section>
      </main>
    );
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
