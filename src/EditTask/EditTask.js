import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const EditableInput = (props) => {
  // We use hooks to declare "initial" states
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  console.log(text)
  const token = localStorage.getItem("token");
  var selectTag = document.querySelector("select");
  var selectedOption = selectTag?.options[selectTag.selectedIndex]?.innerHTML;
  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
      let data = new URLSearchParams();

      data.append(props.label, text);

      axios
        .put(`http://localhost:8000/task/${props.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        .then((res) => {
          // window.location.reload();
          console.log(res)

        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      {inputVisible ? (
        <>
          {!props.select ?
            <input
              ref={inputRef} // Set the Ref
              value={text} // Now input value uses local state
              type={props.type}
              onChange={(e) => {
                setText(e.target.value);

              }}
            />
            :

            <select
              // select importance

              ref={inputRef} // Set the Ref
              onClick={(e) => {
                setText(e.target.value);

              }}
            // Now input value uses local state
            >
              <option></option>
              <option value="low" >low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="null">null</option>
            </select>
          }
        </>
      ) : (
        <span onClick={() => setInputVisible(true)}>{!props.select ? text : selectedOption || text}</span>
      )}
    </React.Fragment>
  );
};

export default EditableInput;