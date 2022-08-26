import React, { useState } from 'react'
import "./Login.css";
import manPic from '../../pic/manPic.png'
import womenPic from '../../pic/womenPic.png'
import logo from '../../pic/logo.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [error, setError] = useState(false);
  const [errorr, setErrorr] = useState("");


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login
  const login = async (e) => {
    e.preventDefault();
    // setLoading(true)
    var admin = { email, password }
    axios.post(`http://localhost:8000/users/signin`, admin)
      .then(async res => {
        // console.log("token", res.data.Token)

        // setLoading(false);
        localStorage.setItem("token", res.data.Token);
        // window.location.reload();
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

        <img src={logo} className='IdoLogo' width={200} />

        <div className='Pictures'>
          <img src={manPic} width={120} />
          <img src={womenPic} width={300} />


        </div>

      </div>
      <div className='formLogIn'>
        <h1 className='h1FormLogIn'>Time to Work!</h1>
        <form className='formLogInn'>
          <labe className="labelLogIn" >
            Email
          </labe>

          <input className='inputLogIn'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></input>
          <label className="labelLogIn"
          >

            password
          </label>


          <input className='inputLogIn'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"

          ></input>
          {error && <p id="login-error">
            {/* {errorr} */}
            Incorrect username or password! Please try again
          </p>}

          <button className='btnSignIn'
            onClick={login}
          >SIGN IN</button>
        </form>
      </div>


    </div>
  )
}

export default Login