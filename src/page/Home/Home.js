import React, { useState, useEffect, } from 'react'
import "./Home.css"
import info from '../../pic/ShowQuote.svg'
import Card from '../Card/Card'
import axios from "axios";
import Info from '../Info/Info'
import { useDispatch } from 'react-redux'
import {  setTasks } from "../../features/task/taskSlice";
import { setSearchTasks } from "../../features/task/taskSliceSearchTask.js";
import DragList from '../../Drak drop/DragList'
import AddTaskCard from '../AddTask/AddTaskCard';
function Home() {
  const token = localStorage.getItem("token");
  const [showinfo, setShowinfo] = useState(false);
  const [showinfoIcon, setShowinfoIcon] = useState(true);
  const dispatch = useDispatch();
  const openInfo = () => {
    setShowinfo({ showinfo: true })
    setShowinfoIcon(false);
  }
  const handleClose = () => {
    setShowinfo(false);
    setShowinfoIcon(true);
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
          dispatch(setTasks(res.data.response));
          dispatch(setSearchTasks(res.data.response));
          // console.log(res.data.response)
        }
        )
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className='containerHome'>
      <div className="infoHome">
        {showinfoIcon &&
          <img src={info} alt="info" width={20} className="infoIconHome"
            onClick={openInfo}
          />}
        {showinfo && <Info
          handleClose={handleClose}
        />}
      </div>
      <div className='tasksCrad'>
      {/* <AddTaskCard /> */}
          
      <DragList
      getAlltaskById={getAlltaskById}
       />
      </div>
    </div>
  )
}

export default Home