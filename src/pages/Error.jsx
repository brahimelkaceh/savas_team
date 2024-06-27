import "../styles/error.css";
import error404 from '../assets/error404.png'
import { Link } from "react-router-dom";
import {BsArrowReturnLeft} from 'react-icons/bs'
const Error = () => {
  return (
    <main className="error-container">
      <h1>Uh Oh!</h1>
      <h2>the page you were looking for doesn't exist.</h2>
      <img src={error404} alt="" />
      <Link to="/" className="btn">Home Page</Link>
      
    </main>
  );
};

export default Error;
