import { Draggable } from "react-beautiful-dnd";
// import { LoremIpsum } from "lorem-ipsum";
// import { generateFromString } from "generate-avatar";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import EditTask from "../EditTask/EditTask"
const CardFooter = styled.div`
  width: 100%;
  display: flex;
`;
const DragItem = styled.div`
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #212529;  
  margin: 0 0 8px 0;
  display: grid;
  flex-direction: column;
`;


const ListItem = ({ task, index, }, props) => {
  return (
    <Draggable draggableId={task._id}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardFooter
              className='containerCradsDrop'
            >
              <div className='cradH2'>
                <EditTask
                  id={task._id}
                  text={task.title}
                  label="title"
                  type="text"
                  select={false}
                />
              </div>
              <table className='containerCrad'>
                <tr className='titleCrad'>
                  <td className='tdTitleCrad'>category</td>
                  <td className='tdTitleCrad'>due Date</td>
                  <td className='tdTitleCrad'>estimate</td>
                  <td className='tdTitleCrad'>importance</td>
                </tr>
                <tr className='valueCrad'>
                  <td>
                    {task.category_id?.name || ""}
                  </td>
                  <td>
                    <EditTask
                      id={task._id}
                      text={new Date(task.dueDate).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}
                      label="dueDate"
                      type="date"
                      select={false}
                    />
                  </td>
                  <td>
                    <EditTask
                      id={task._id}
                      text={task.estimate}
                      label="estimate"
                      type="text"
                      select={false}
                    />
                  </td>
                  <td >
                    <div className={task.importance}>
                      <EditTask
                        id={task._id}
                        text={task.importance === "null" ? "" : `${task.importance}`}
                        label="importance"
                        type="text"
                        select={true}
                        task={task}
                        getAlltaskById={props.getAlltaskById}

                      />
                    </div>
                  </td>
                </tr>
              </table>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
