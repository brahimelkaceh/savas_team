import jwt_decode from "jwt-decode";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
let base_url = "https://farmdriver.savas.ma/api/";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  // console.log(children);
  const [loading, setLoading] = useState(false);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [isTime, SetIsTime] = useState(0);
  // let isTime;

  const navigate = useNavigate();

  let loginUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    let response = await fetch(`${base_url}token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setLoading(false);
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      const accessToken = data.access;

      let expirTime = Math.floor(jwt_decode(accessToken).exp);
      let currentTime = Math.floor(new Date().getTime() / 1000);
      let TimeOut = expirTime - currentTime;

      setInterval(() => {
        updateToken();
      }, TimeOut * 1000);
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  // update token
  let updateToken = async () => {
    if (localStorage.getItem("authTokens")) {
      const refreshToken = {
        refresh: JSON.parse(localStorage.getItem("authTokens")).refresh,
      };
      // console.log(refreshToken)
      let response = await fetch(`${base_url}token/refresh`, {
        method: "POST",
        body: JSON.stringify(refreshToken),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        let daTa = {
          "access": data.access,
          "refresh": refreshToken.refresh,
        };
        setAuthTokens(daTa);
        setUser(jwt_decode(daTa.access));
        localStorage.setItem("authTokens", JSON.stringify(daTa));
        let expirTime = Math.floor(jwt_decode(daTa.access).exp);
        let currentTime = Math.floor(new Date().getTime() / 1000);
        let TimeOut = expirTime - currentTime;
        SetIsTime(TimeOut);
      } else {
        logoutUser();
      }
    } else {
      logoutUser();
    }
  };

  useEffect(() => {
    if (authTokens) {
      const accessToken = JSON.parse(
        localStorage.getItem("authTokens")
      )?.access;
      if (accessToken) {
        let expirTime = Math.floor(jwt_decode(accessToken).exp);
        let currentTime = Math.floor(new Date().getTime() / 1000);
        let TimeOut = expirTime - currentTime;

        if (TimeOut > 0) {
          setTimeout(() => {
            setInterval(() => {
              updateToken();
            }, 172800000);
          }, isTime);
        } else {
          updateToken();
        }
      }
    }
  }, []);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
