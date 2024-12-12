import React, { useState } from "react";
import "./Login_Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login_Signup() {
  const [isLogin, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState({});
  const [serverResponsefS, setServerResponsefS] = useState("");

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
  //form validation

  const validateEmail = (email) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUppercase && hasSpecialChar;
  };

  const formValidation = () => {
    let validationErrors = {};

    if (!name && !isLogin) validationErrors.name = "Name is required";
    if (!email || !validateEmail(email))
      validationErrors.email = "inavlid email";
    if (!password || !validatePassword(password))
      validationErrors.password =
        "password must have specialcharacter and uppercase";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  //login logic
  const userLogin = async () => {
    // if (!formValidation()) return;
    try {
      let errors = {};
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        { email, password }
      );
      errors.msg = response.data.msg;
      setServerResponse(errors);
    } catch (err) {
      //error
    }
  };

  //singup logic

  const userRegister = async () => {
    if (!formValidation()) return;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          name,
          email,
          password,
        }
      );
    } catch (err) {
      let errors = "";
      if (axios.isAxiosError(err)) {
        const stat = err.response.data.msg;
        errors = stat;
        setServerResponsefS(stat);
      }
    }
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
              onClick={() => {
                userLogin();
                setTimeout(() => {
                  setServerResponse({});
                }, 600);
              }}
            />
            <p>
              New User ?<span onClick={updateState}> Signup Now</span>
            </p>
          </div>
          {serverResponse && <div className="error">{serverResponse.msg}</div>}
        </form>
      ) : (
        //signup page
        <form action="" autoComplete="on">
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
              onClick={() => {
                userRegister();
                setTimeout(() => {
                  setServerResponsefS("");
                  setErrors({});
                }, 600);
              }}
            />
            <p>
              Already registered ?
              <span
                onClick={() => {
                  updateState();
                  setName("");
                  setEmail("");
                  setPassword("");
                  setServerResponse({});
                }}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
          {serverResponsefS && <div className="error"> {serverResponsefS}</div>}
          {errors && (
            <div className="error">
              {errors.name || errors.email || errors.password}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Login_Signup;
