import React from "react";
import { Link } from "react-router-dom";
function Register() {
  return (
    <main className="login-page">
      <form className="login-form">
        <p className="title">Register </p>
        <p className="message">Register now and get full access to our app. </p>
        <span name="errMsg"></span>
        <div className="flex">
          <label>
            <input placeholder="" type="text" className="input" required />
            <span>Username</span>
          </label>
          <label>
            <input placeholder="" type="text" className="input" required />
            <span>Username</span>
          </label>
        </div>
        <label>
          <input placeholder="" type="text" className="input" required />
          <span>Username</span>
        </label>

        <label>
          <input
            placeholder=""
            type="password"
            className="input"
            name="password"
            id="password"
            required
          />
          <span>Password</span>
        </label>

        <button className="submit">Submit</button>
        <p className="signin">
          You don't have an acount ?
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
