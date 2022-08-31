import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";


const DragDropContextContainer = styled.div`
  padding-left: 20px;
  border: none;
  border-radius: 6px;
  width:80%
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = (tasks, prefix) => {

  const filteredTasks = tasks.filter(task => task.status === prefix)
  return filteredTasks;
  // filteredTasks.map(task => task)
}

// Array.from({ length: count }, (v, k) => k).map((k) => {
//   const randomId = Math.floor(Math.random() * 1000);
//   return {
//     id: `item-${randomId}`,
//     prefix,
//     content: `item ${randomId}`
//   };
// });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["To Do", "Doing", "Done"];

const generateLists = (tasks) => ({ "To Do": getItems(tasks, "To Do"), "Doing": getItems(tasks, "Doing"), "Done": getItems(tasks, "Done") })

function DragList() {
  const token = localStorage.getItem("token");

  const Searchtask = useSelector((state) => state.Searchtask.value);
  const [elements, setElements] = useState(generateLists(Searchtask));

  useEffect(() => {
    setElements(generateLists(Searchtask));
  }, [Searchtask]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    // console.log(elements)

    // console.log(listCopy)
    // console.log(result)

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );

    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);

    try {
      await axios
        .put(`http://localhost:8000/task/${result.draggableId}`, { status: result.destination.droppableId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          // alert("status changes successfully")
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => {
            return (<DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
            )
          })}
          {/* <div className='container_toDo'>
              <img src={ToDo} width={20} className="statusHome" />
              <p>To Do</p>
            </div>
            {Searchtask.map(task => {
              if (task.status == "To Do")
                return ( <DraggableElement
              // elements={elements[listKey]}
              // key={listKey}
              // prefix={listKey}
            />)
            })} */}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
