import React, { useState } from "react";
import "./Login_Signup.css";
import { Link } from "react-router-dom";

function Login_Signup() {
  const [isLogin, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //input handling

  const nameHandle = (event) => {
    const name = event.target.value;
    setName(name);
  };
  const emailHandle = (event) => {
    const email = event.target.value;
    setEmail(email);
  };
  const passwordHandle = (event) => {
    const password = event.target.value;
    setPassword(password);
  };
  const updateState = () => {
    setLogin(!isLogin);
  };

  //login logic
  const userLogin = (event) => {
    console.log(email);
  };

  //sigun logic

  const userRegister = (event) => {
    console.log(name);
  };

  //design

  return (
    //loginpage
    <div className="loginsignupcontainer">
      {isLogin ? (
        <form action="" autoComplete="on">
          <h2>Login Now</h2>
          <div className="inputs">
            <img src="/assets/email.svg" alt="" width="20px" />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={emailHandle}
              name="email"
            />
          </div>
          <div className="inputs mg">
            <img src="/assets/pass.svg" alt="" width="20px" />
            <input
             name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={passwordHandle}
            />
          </div>
          <div className="frgtpass">
            <p>
              <span>
                <Link
                  to="/resetpass"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Forgot Password ?{" "}
                </Link>
              </span>
            </p>
          </div>
          <div className="bottom">
            <input
              type="button"
              value="Login"
              className="btn"
              onClick={userLogin}
            />
            <p>
              New User ?<span onClick={updateState}> Signup Now</span>
            </p>
          </div>
        </form>
      ) : (
        //signup page
        <form action="">
          <h2>Register</h2>
          <div className="inputs">
            <img src="/assets/acc.svg" alt="" width="20px" />
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={nameHandle}
            />
          </div>
          <div className="inputs">
            <img src="/assets/email.svg" alt="" width="20px" />
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={emailHandle}
            />
          </div>
          <div className="inputs">
            <img src="/assets/pass.svg" alt="" width="20px" />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={passwordHandle}
            />
          </div>
          <div className="bottom">
            <input
              type="button"
              value="SignUp"
              className="btn"
              onClick={userRegister}
            />
            <p>
              Already registered ?<span onClick={updateState}> Login</span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login_Signup;
