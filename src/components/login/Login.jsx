import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useSelector, useDispatch } from "react-redux";
import { loginForm } from "../../slices/Login";
import AuthContext from "../../context/AuthContext";
import Loader from "../loader/Loader";

const Login = () => {
  const { loginUser, loading } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const status = useSelector((state) => state.loginForm.status);
  const dispatch = useDispatch();

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={loginUser}>
        <p className="title">Se Connecter </p>
        <p className="message">
          Connectez-vous maintenant et obtenez un accès complet à notre
          application.
        </p>
        <span ref={errRef} name="errMsg">
          {errMsg}
        </span>
        <label>
          <input
            placeholder=""
            type="text"
            className="input"
            required
            name="username"
            id="username"
            ref={userRef}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <span>Identifiant</span>
        </label>

        <label>
          <input
            placeholder=""
            type="password"
            className="input"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Mot de passe</span>
        </label>

        <button className="submit">Soumettre</button>
        {/* <p className="signin">
          Vous n'avez pas de compte
          <Link to="/register">
            <span>?Inscription</span>
          </Link>
        </p> */}
        {loading && <Loader />}
      </form>
    </main>
  );
};

export default Login;
