import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const Register = () => {
  const { app } = useParams();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  function redirect() {
    switch (app) {
      case "multicards":
        window.location.href = "https://multicards.phyotp.dev";
        break;
      default:
        window.location.href = "https://phyotp.dev";
    }
  }
  function register(e) {
    e.preventDefault();  // Prevent form from reloading the page

    const user = {
        username: username,
        password: password
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch("https://phyotp.pythonanywhere.com/api/phyoid/register", options)
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        if (data.access_token) {  // Assuming the token is returned as 'token'
            // Store the token as a cookie
            document.cookie = `jwt=${data.access_token}; path=/; domain=.phyotp.dev; Secure; SameSite=None`;
            // Now redirect based on the 'app' param
            redirect();
        } else {
            // Handle error case (e.g. wrong credentials)
            alert('Registration failed. Please check your username and password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  return (
    <div className="container">
    <StyledWrapper>
      <div className="container">
        <form className="card" onSubmit={register}>
          <p className="register">Register</p>
          <div className="inputBox">
            <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <span className="user">Username</span>
          </div>

          <div className="inputBox">
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </div>

          <input type="submit" className="enter" />
          <Link to={"/login" + (app ? "/" + app : "")} className="login">Log in Here</Link>
        </form>
      </div>
    </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .register {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
}
.login {
  color: #fff;
  text-transform: uppercase;
  border: none;
  padding: 5px;
  background-color: #0e0e0e;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  transition: 0.5s;
  text-decoration: none;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 350px;
  flex-direction: column;
  gap: 35px;
  background: #0e0e0e;
  box-shadow: 0px 0px 64px #e8e8e8;
  border-radius: 16px;
}

.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 1em;
  background: transparent;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transition: 0.1s;
  border-bottom-left-radius: 8px;
}

.inputBox span {
  margin-top: 5px;
  position: absolute;
  left: 0;
  transform: translateY(-4px);
  margin-left: 10px;
  padding: 10px;
  pointer-events: none;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 3px;
  border-radius: 8px;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  transform: translateX(113px) translateY(-15px);
  font-size: 0.8em;
  padding: 5px 10px;
  background: #fff;
  letter-spacing: 0.2em;
  color: #000;
  border: 2px;
}

.inputBox input:valid,
.inputBox input:focus {
  border: 2px solid #fff;
  border-radius: 8px;
}

.enter {
  height: 45px;
  width: 100px;
  border-radius: 5px;
  border: 2px solid #fff;
  cursor: pointer;
  background-color: transparent;
  transition: 0.5s;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 1em;
  color: #fff;
}

.enter:hover {
  background-color: #fff;
  color: #000;
}
.login:hover {
  background-color: #fff;
  color: #000;
}

`;

export default Register;
/*
Copyright - 2024 JkHuger (JkHuger) 
Copyright - 2024 PhyoTP (Phyo Thet Pai) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/