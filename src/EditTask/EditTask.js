import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const EditableInput = (props) => {
  // We use hooks to declare "initial" states
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
      let data = new URLSearchParams();

      data.append(props.label, text);

      axios
        .put(${backendApi}${props.api}/${props.id}, data)
        .then((res) => console.log(res))
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
        <input
          id={"photo"}
          style={style}
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          type={props.type}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      ) : (
        <span onClick={() => setInputVisible(true)}>{text}</span>
      )}
    </React.Fragment>
  );
};

export default EditableInput;