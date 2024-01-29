"use client";
import React, {useState, useRef} from "react";
import styles from "../../../styles/scss/todoList.module.scss";

//Custom React hook -> useBoard
export const useBoard = () => {
  const sectionInputRef = useRef();
  const [showAddSection, setShowAddSection] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [placeholder, setPlaceholder] = useState("Name this section");

  const getRefValue = () => {
    return sectionInputRef.current.value;
  };

  const switchAddSectionHandler = () => {
    setShowAddSection((preState) => {
      if (preState) {
        setSectionName("");
        setPlaceholder("Name this section");
      }
      return !preState;
    });
  };

  const failHandler = (event) => {
    setSectionName("");
    setPlaceholder("This board already exists, please try another name");
  };

  const nameChangeHandler = (event) => {
    setSectionName(event.target.value);
  };

  return {
    sectionInputRef,
    showAddSection,
    sectionName,
    placeholder,
    failHandler,
    nameChangeHandler,
    switchAddSectionHandler,
    setSectionName,
    getRefValue,
  };
};

//AddBoard
function AddBoard({type, sectionName, placeholder,submitHandler, nameChangeHandler,refSection,closeHandler}) {

  return (
    <form className={styles.add_section_form} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder={placeholder}
        ref={refSection}
        value={sectionName}
        onChange={nameChangeHandler}
      />
      <div>
        <button
          type="submit"
          className={`${styles.add_btn}  ${sectionName && styles.valid}`}
          disabled={!sectionName}
          style={{ cursor: sectionName && "pointer" }}
        >
          {type == "add" ? "Add section" : "Save"}
        </button>
        <button
          type="button"
          className={styles.cancel_btn}
          onClick={closeHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddBoard;
