import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <div className="container">
    <StyledWrapper>
      <div className="container">
        <div className="card">
          <p className="login">Log in</p>
          <div className="inputBox">
            <input required type="text" />
            <span className="user">Username</span>
          </div>

          <div className="inputBox">
            <input required type="password" />
            <span>Password</span>
          </div>

          <button className="enter">Enter</button>
          <button className="register">Register Here</button>
        </div>
      </div>
    </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .login {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
}
.register {
  color: #fff;
  text-transform: uppercase;
  border: none;
  padding: 5px;
  background-color: #0e0e0e;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  transition: 0.5s;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
  width: 300px;
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
.register:hover {
  background-color: #fff;
  color: #000;
}

`;

export default Login;
