import React, { useState } from 'react'
import logo from '../../pic/logo.png'
import search from '../../pic/Search.svg'
import circle from '../../pic/Circle.svg'
import plus from '../../pic/Add.svg'
import Bitmap from '../../pic/Bitmap@2x.png'
import logOut from '../../pic/Icon ionic-ios-log-out.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";



import "./NavBar.css"
import AddTask from '../AddTask/AddTask'
import { useDispatch } from 'react-redux'
function NavBar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showTask, setShowTask] = useState(false);
  // const [showFormAddTask, setShowFormAddTask] = useState(false);


  const openProfile = () => {
    setShowProfile(!showProfile)
    // setShowProfile({ showProfile: false })
  }
  const handleClose = () => {
    setShowTask(false);
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("superAdmin");
    navigate('/')
  }

  return (
    <div className='containerNabBar'>
      <img src={logo} width={50} className="logoNavBar" />
      <div className='secondNavBar'>
        {/* <div class="container-2">
          <span class="icon">
            <img src={search} width={20} />

          </span>
          <input type="search" id="search" placeholder="Search..." />
        </div> */}
        <img src={search} width={20} />

        <div className='iconAddNavBar'
          onClick={() => setShowTask(true)
          }
        >
          <img src={circle} width={20} />
          <img src={plus} width={10} className="plusNavBar" />
        </div>
        {showTask &&
          <AddTask
            showTask={showTask}
            handleClose={handleClose}
          />
        }
        <img src={Bitmap} width={30} className="profileNavBar"
          onClick={openProfile}
        />
        {showProfile &&
          <div className='showProfile'>
            <img src={Bitmap} className='picProfile' />
            <div className='email_logout'>
              <p className='Email_Profile'>email@gmail.com</p>
              <div className='EmailProfile' onClick={logout}>
                logout
                <img src={logOut} width={20} className="iconLogOut" />
              </div>
            </div>
          </div>
        }

      </div>



    </div>
  )
}

export default NavBar