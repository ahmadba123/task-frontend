import React, { useState } from 'react'
import "./Login.css";
import manPic from '../../pic/manPic.png'
import womenPic from '../../pic/womenPic.png'
import logo from '../../pic/logo.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login 
  const login = async (e) => {
    e.preventDefault();
    var admin = { email, password }
    axios.post(`http://localhost:8000/users/signin`, admin)
      .then(async res => {
        // console.log("token", res.data.Token)
        localStorage.setItem("token", res.data.Token);
        navigate("/home")
      })
      .catch((error) => {
        console.log(error.response.message);
        // setErrorr(error.response.message)
        setError(true);
      });
  }


  return (
    <div className='containerLogin'>
      <div className='part1LogIn'>
        <img src={logo} alt="logo_Ido" className='IdoLogo' width={200} />
        <div className='Pictures'>
          <img src={manPic} alt="pic_man" width={120} />
          <img src={womenPic} alt="pic_women" width={300} />
        </div>
      </div>
      <div className='formLogIn'>
        <h1 className='h1FormLogIn'>Time to Work!</h1>
        <form className='formLogInn'>
          <label className="labelLogIn"> Email </label>
          <input className='inputLogIn'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></input>
          <label className="labelLogIn">password</label>
          <input className='inputLogIn'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password">
          </input>
          {error && <p id="login-error">
            Incorrect username or password! Please try again
          </p>}
          <button className='btnSignIn' onClick={login}>
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login