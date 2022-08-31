import { Draggable } from "react-beautiful-dnd";
// import { LoremIpsum } from "lorem-ipsum";
// import { generateFromString } from "generate-avatar";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from 'react-redux'

// const Avatar = styled.img`
//   height: 30px;
//   width: 30px;
//   border: 3px solid white;
//   border-radius: 50%;
// `;

// const CardHeader = styled.div`
//   font-weight: 500;
// `;

// const Author = styled.div`
//   display: flex;
//   align-items: center;
// `;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  ${'' /* justify-content: space-between; */}
  ${'' /* height:180px; */}
  ${'' /* weight:110px; */}
  
  ${'' /* align-items: center; */}
`;

const DragItem = styled.div`
  padding: 10px;
  ${'' /* border-radius: 6px; */}
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #212529;  
  margin: 0 0 8px 0;
  display: grid;
  ${'' /* grid-gap: 20px; */}
  flex-direction: column;
  ${'' /* height:120px   */}
`;

// const lorem = new LoremIpsum();

const ListItem = ({ task, index, props }) => {
  //   const randomHeader = useMemo(() => lorem.generateWords(5), []);
  const Searchtask = useSelector((state) => state.Searchtask.value);

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
            {/* <CardHeader>{randomHeader}</CardHeader> */}
            <CardFooter
              className='containerCradsDrop'
            >
              <div className='cradH2'>{task.title}</div>
              <table className='containerCrad'>
                <tr className='titleCrad'>

                  <td className='tdTitleCrad'>category</td>
                  <td className='tdTitleCrad'>due Date</td>
                  <td className='tdTitleCrad'>estimate</td>
                  <td className='tdTitleCrad'>importance</td>

                </tr>
                <tr className='valueCrad'>
                  <td>{task.category_id?.name || ""}</td>
                  <td>{new Date(task.dueDate).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}</td>
                  <td>{task.estimate}</td>
                  <td >
                    <div className={task.importance}>
                      {task.importance === "null" ? "" : `${task.importance}`}
                    </div>
                  </td>
                </tr>
              </table>
              {/* <Author>
                {task._id}
                <Avatar
                //   src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`}
                />
              </Author> */}
            </CardFooter>
            {/* <div className='containerCrads' >
            <div className='cradH2'>{props.task.title}</div>
            <table className='containerCrad'>
                <tr className='titleCrad'>

                    <td className='tdTitleCrad'>category</td>
                    <td className='tdTitleCrad'>due Date</td>
                    <td className='tdTitleCrad'>estimate</td>
                    <td className='tdTitleCrad'>importance</td>

                </tr>
                <tr className='valueCrad'>
                    <td>{props.task.category_id?.name || ""}</td>
                    <td>{new Date(props.task.dueDate).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}</td>
                    <td>{props.task.estimate}</td>
                    <td >
                        <div className={props.task.importance}>
                            {props.task.importance === "null" ? "" : `${props.task.importance}`}
                        </div>
                    </td>
                </tr>
            </table>


        </div> */}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
