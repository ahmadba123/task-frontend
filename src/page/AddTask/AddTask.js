import React, { useState, useEffect, } from 'react'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./AddTask.css"
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/task/taskSlice';
import axios from "axios";
import { setTasks } from "../../features/task/taskSlice";

const token = localStorage.getItem("token");

function AddTask(props) {
    const [value, setValue] = useState({})
    const [category, setCategory] = useState([])
    const [user, setUser] = useState([])


    const dispatch = useDispatch();

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })

    }
    useEffect(() => {
        getAllDatacategory();
        getAllDataUser();
        // getAlltaskById();
    }, []);
    // console.log()
    const handleSubmit = async (event) => {
        let data = value;
        await axios
            .post(`http://localhost:8000/task`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {
                console.log(res.data.response);
                dispatch(addTask(res.data.response));

            })
            .catch((err) => console.log(err));


        event.preventDefault();
        // props.addNewDoctor(value)
        props.handleClose();
    }
  
    const getAllDatacategory = async () => {

        try {

            await axios
                .get(`http://localhost:8000/categories`)
                .then((res) => {
                    setCategory(res.data.response);
                    // console.log(res.data)



                })
                .catch((err) => console.log(err));
        } catch (e) {
            console.log(e);
        }
    };
    const getAllDataUser = async () => {

        try {

            await axios
                .get(`http://localhost:8000/users`)
                .then((res) => {
                    setUser(res.data.response);
                    console.log(res.data)



                })
                .catch((err) => console.log(err));
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="addDriver-container">
            <form method="POST">
                <Dialog
                    // TransitionComponent={props.Transition}
                    open={props.showTask}
                    onClose={props.handleClose}
                >
                    <DialogTitle>Add new task</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="title"
                            label="title"
                            onChange={handleChange}
                            type="name"
                            fullWidth
                            variant="standard"
                            name='title'
                        />


                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="dueDate"
                            label=""
                            onChange={handleChange}
                            type="date"
                            fullWidth
                            variant="standard"
                            InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
                            name='dueDate'

                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="estimate"
                            label="standard"
                            onChange={handleChange}
                            type="name"
                            fullWidth
                            variant="standard"
                            name='estimate'
                        />
                        <FormControl fullWidth
                            margin="dense"
                        >

                            <InputLabel id="demo-simple-select-label">categories</InputLabel>
                            <Select
                                required
                                autoFocus
                                margin="dense"
                                // id="category_id.name"
                                labelId="demo-simple-select-label"
                                variant="standard"

                                label="domain"
                                onChange={handleChange}
                                name='category_id'
                                className='inputVisit'
                                

                            >
                                <MenuItem selected="To Do"></MenuItem>
                                {category.map(categories => {
                                    return <MenuItem value={categories._id}>{categories.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth
                            margin="dense"
                        >

                            <InputLabel id="demo-simple-select-label">importance</InputLabel>
                            <Select
                                required
                                autoFocus
                                margin="dense"
                                id="importance"
                                labelId="demo-simple-select-label"
                                variant="standard"

                                label="importance"
                                onChange={handleChange}
                                name='importance'
                                className='inputVisit'

                            >
                                <MenuItem value="medium">medium</MenuItem>
                                <MenuItem value="low">low</MenuItem>
                                <MenuItem value="large">large</MenuItem>



                            </Select>
                        </FormControl>
                        {/* <FormControl fullWidth
                            margin="dense"
                        >

                            <InputLabel id="demo-simple-select-label">user</InputLabel>
                            <Select
                                required
                                autoFocus
                                margin="dense"
                                id="user_id"
                                labelId="demo-simple-select-label"
                                variant="standard"

                                label="importance"
                                onChange={handleChange}
                                name='user_id'
                                className='inputVisit'

                            >
                                <MenuItem></MenuItem>
                                {user.map(users => {
                                    return <MenuItem value={users._id}>{users.email}</MenuItem>
                                })}



                            </Select>
                        </FormControl> */}

                        <FormControl fullWidth
                            margin="dense"
                        >

                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                            <Select
                                required
                                autoFocus
                                margin="dense"
                                id="status"
                                labelId="demo-simple-select-label"
                                variant="standard"

                                label="importance"
                                onChange={handleChange}
                                name='status'
                                className='inputVisit'

                            >
                                <MenuItem value="Doing">Doing</MenuItem>
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>



                            </Select>
                        </FormControl>

                    </DialogContent>

                    <DialogActions>
                        <Button type="submit"
                            onClick={handleSubmit}
                        >Save</Button>
                        <Button onClick={props.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    )
}

export default AddTask



