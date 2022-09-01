import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import {  useSelector } from 'react-redux'
import axios from "axios";
import AddTaskCard from "../page/AddTask/AddTaskCard";
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
// drag card 
const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};
// drag drop 
const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};
// status type
const lists = ["To Do", "Doing", "Done"];
const generateLists = (tasks) =>
({
  "To Do": getItems(tasks, "To Do"),
  "Doing": getItems(tasks, "Doing"),
  "Done": getItems(tasks, "Done")
})
// filter card by status
const getItems = (tasks, prefix) => {
  const filteredTasks = tasks.filter(task => task.status === prefix)
  return filteredTasks;
}
function DragList(props) {
  const Searchtask = useSelector((state) => state.Searchtask.value);
  const [elements, setElements] = useState(generateLists(Searchtask));
  const token = localStorage.getItem("token");


  useEffect(() => {
    setElements(generateLists(Searchtask));
  }, [Searchtask]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] =
      removeFromList(
        sourceList,
        result.source.index
      );

    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] =
      addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
    setElements(listCopy);
    // update status  in drak and drop
    try {
      await axios
        .put(`http://localhost:8000/task/${result.draggableId}`,
          { status: result.destination.droppableId }, {
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
            return (
              <>
              <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
              getAlltaskById={props.getAlltaskById}
            />
            
            </>
            )
          }
          
          )}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
