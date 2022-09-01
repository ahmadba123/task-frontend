import React, { useState, useEffect, } from 'react'
import logo from '../../pic/logo.png'
import search from '../../pic/Search.svg'
import circle from '../../pic/Circle.svg'
import plus from '../../pic/Add.svg'
import Bitmap from '../../pic/Bitmap@2x.png'
import logOut from '../../pic/Icon ionic-ios-log-out.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTasks } from "../../features/task/taskSliceSearchTask.js";

import "./NavBar.css"
import AddTask from '../AddTask/AddTask'
function NavBar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const tasks = useSelector((state) => state.task.value);
  const [task, setTask] = useState({});

  const dispatch = useDispatch();


  const openProfile = () => {
    setShowProfile(!showProfile)
  }
  const handleClose = () => {
    setShowTask(false);
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }
  const token = localStorage.getItem("token");

  const setSearchTaskss = (value) => {

    const searchedData = tasks.filter((val) => {
      if (value === "") {
        return val;
      }
      else if (val.title.toLowerCase().includes(value.toLowerCase())) {
        return val;
      }

    })
    dispatch(setSearchTasks(searchedData));
  }
  useEffect(() => {
    getAlltaskById();
  }, []);


  const getAlltaskById = async (item) => {
    console.log(item);
    try {

      await axios
        .get(`http://localhost:8000/task/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          setTask(res.data.response[0]);
          console.log(res.data.response);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='containerNabBar'>
      <img src={logo} alt="logo" width={50} className="logoNavBar" />
      <div className='secondNavBar'>
        <div className='searchDiv'>
          <input type="text" placeholder="what are you looking for?" name="search" className='inputSearch'
            onChange={(event) => {
              console.log(event.target.value)
              setSearchTaskss(event.target.value)
            }}
          />
          <img src={search} width={20} className="searchIcon" />
        </div>

        <div className='iconAddNavBar'
          onClick={() => setShowTask(true)
          }
        >
          <img src={circle} alt="circle" width={20} />
          <img src={plus} alt="plus" width={10} className="plusNavBar" />
        </div>
        {showTask &&
          <AddTask
            showTask={showTask}
            handleClose={handleClose}
          />
        }
        <img src={Bitmap} alt="Bitmap" width={30} className="profileNavBar"
          onClick={openProfile}
        />
        {showProfile &&

          <div className='showProfile'>
            <img src={Bitmap} alt="Bitmap" className='picProfile' />
            <div className='email_logout'>
              <p className='Email_Profile'>
                <p > {task.user_id?.email || ""}</p>
              </p>
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