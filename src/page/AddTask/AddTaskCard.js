// import React, { useState, useEffect, } from 'react'
// import { addTask } from '../../features/task/taskSlice';
// import { useDispatch } from 'react-redux';
// import axios from "axios";

// function AddTaskCard() {
//     const token = localStorage.getItem("token");
//     const [value, setValue] = useState({})
//     const [category, setCategory] = useState([])
//     const [showCategories, setShowCategories] = useState(false)
//     const [categ, setCateg] = useState({})
//     const dispatch = useDispatch();
//     const handleChange = (event) => {
//         setValue({ ...value, [event.target.name]: event.target.value })
//     }
//     const handleSubmit = async (event) => {
//         let data = value;
//         await axios
//             .post(`http://localhost:8000/task`, data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 }
//             )
//             .then((res) => {
//                 // console.log(res.data.response);
//                 dispatch(addTask(res.data.response));
//                 window.location.reload();
//                 const catego = {
//                     name: categ
//                 }
//                 setCategory(category => [...category, catego])
//             })
//             .catch((err) => console.log(err));
//         event.preventDefault();
//         // props.handleClose();
//     }
//     return (
//         <div className='containerAddCrads' >
//             <div>addCard</div>
//             {/* <div className='cradH2'>{task.title}</div> */}
//             <table className='containerCrad'>
//                 <tr className='titleCrad'>

//                     <td className='tdTitleCrad'>category</td>
//                     <td className='tdTitleCrad'>due Date</td>
//                     <td className='tdTitleCrad'>estimate</td>
//                     <td className='tdTitleCrad'>importance</td>
//                 </tr>
//                 <tr className='valueCrad'>
//                     <td>
//                         <input
//                             id="title"
//                             type="string"
//                             name='title'
//                             onChange={handleChange}
//                         >
//                         </input>
//                     </td>
//                     <td><input></input></td>
//                     <td><input></input></td>
//                     <td >
//                         <div></div>
//                     </td>
//                 </tr>
//             </table>
//         </div>
//     )
// }

// export default AddTaskCard