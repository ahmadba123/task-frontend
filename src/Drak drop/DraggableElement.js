import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";
import Doing from '../pic/DoingIcon.svg'
import Done from '../pic/DoneIcon.svg'
import ToDo from '../pic/ToDoIcon.svg'
import AddTaskCard from "../page/AddTask/AddTaskCard";
// style header div
const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;
// style first div
const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: transparent;
`;
// icon to header crad
const iconSwitch = (prefix) => {
  let image = <></>
  switch (prefix) {
    case "To Do":
      image = <img src={ToDo} alt="To Do icon" width={20} className="statusHome" />

      break;
    case "Doing":
      image = <img src={Doing} alt="Doing icon" width={20} className="statusHome" />

      break;
    case "Done":
      image = <img src={Done} alt="Done icon" width={20} className="statusHome" />

      break;
    default:
      image = <img src={ToDo} alt="To Do icon" width={20} className="statusHome" />
  }

  return image
}

const DraggableElement = ({ prefix, elements }, props) => {
  return (<>
    <DroppableStyles>
      <ColumnHeader className="container_toDo">
        <span>{iconSwitch(prefix)}</span> {prefix}
      </ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>

            {elements.map((task, index) => (
              <>
                <ListItem key={task._id}
                  task={task}
                  index={index}
                  getAlltaskById={props.getAlltaskById}
                />

              </>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  </>
  )
};

export default DraggableElement;
