import React, { useState, useEffect, } from 'react'
import "./Home.css"
import info from '../../pic/ShowQuote.svg'
import Doing from '../../pic/DoingIcon.svg'
import Done from '../../pic/DoneIcon.svg'
import ToDo from '../../pic/ToDoIcon.svg'
import Card from '../Card/Card'
import axios from "axios";



import Info from '../Info/Info'
function Home(props) {
  const [showinfo, setShowinfo] = useState(false);
  const [showinfoIcon, setShowinfoIcon] = useState(true);
  const [showStatus, setShowStatus] = useState([]);


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
        .get(`http://localhost:8000/task/user/630889867853fa1eb1e67948`)
        .then((res) => {
          setShowStatus(res.data.response);
          console.log(res)



        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='containerHome'>
      <div className="infoHome">
        {showinfoIcon &&
          <img src={info} width={20} className="infoIconHome"
            onClick={openInfo}
          />}

        {showinfo && <Info

          handleClose={handleClose}
        />}



      </div>
      <div className='container_tasks'>
        <div className='container_StatustoDo'>
          <div className='container_toDo'>
            <img src={ToDo} width={20} className="statusHome" />
            <p>To Do</p>
          </div>
          {showStatus.map(task => { if (task.status == "To Do") return (<Card task={task}></Card>) })}

        </div>
        <div className='container_StatustoDo'>
          <div className='container_doing'>
            <img src={Doing} width={20} className="statusHome" />

              <p>Doing</p>
          </div>
          {showStatus.map(task => { if (task.status == "Doing") return (<Card task={task}></Card>) })}
        </div>
        <div className='container_StatustoDo'>
          <div className='container_done'>
            <img src={Done} width={20} className="statusHome" />

            <p>Done</p>

          </div>
            {showStatus.map(task => { if (task.status == "Done") return (<Card task={task}></Card>) })}
        </div>


      </div>


    </div>
  )
}

export default Home