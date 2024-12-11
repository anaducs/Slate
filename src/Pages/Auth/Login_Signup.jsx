import React, { useState } from "react";
import "./Login_Signup.css";
import { Link } from "react-router-dom";

function Login_Signup() {
  const [isLogin, setLogin] = useState(true);
  const updateState = (event) => {
    console.log(event.target.textContent);
    const read = event.target.textContent;
    if(read === "Signup Now"){
      console.log("hi");
      
    }

    setLogin(!isLogin);
  };
  return (
    //loginpage
    <div className="loginsignupcontainer">
      {isLogin ? (
        <form action="">
          <h2>Login Now</h2>
          <div className="inputs">
            <img src="src/assets/email.svg" alt="" width="20px" />
            <input type="email" placeholder="email" />
          </div>
          <div className="inputs mg">
            <img src="src/assets/pass.svg" alt="" width="20px" />
            <input type="password" placeholder="password" />
          </div>
          <div className="frgtpass">
            <p>
              Forgot Password ? <span>reset</span>
            </p>
          </div>
          <div className="bottom">
            <input type="button" value="Login" className="btn" />
            <p>
              New User ?<span onClick={updateState}>Signup Now</span>
            </p>
          </div>
        </form>
      ) : (
        //signup page
        <form action="">
          <h2>Register</h2>
          <div className="inputs">
            <img src="src/assets/acc.svg" alt="" width="20px" />
            <input type="text" placeholder="name" />
          </div>
          <div className="inputs">
            <img src="src/assets/email.svg" alt="" width="20px" />
            <input type="email" placeholder="email" />
          </div>
          <div className="inputs">
            <img src="src/assets/pass.svg" alt="" width="20px" />
            <input type="password" placeholder="password" />
          </div>
          <div className="bottom">
            <input type="button" value="SignUp" className="btn" />
            <p>
              Already registered ?<span onClick={updateState}>Login</span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login_Signup;
