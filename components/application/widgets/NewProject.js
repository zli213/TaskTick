/***
 * The card you can add or edit projects
 */

// "use client";

import { useState, useRef } from "react";
import Modal from "./Modal";
import styles from "../../../styles/scss/newProject.module.scss";
import DownArrowIcon from "../../../public/icon/down_arrow.svg";
import ListIcon from "../../../public/icon/horizon_page.svg";
import CalenderIcon from "../../../public/icon/upcoming.svg";
import BoardIcon from "../../../public/icon/vertical_page.svg";


export default function NewProject(props) {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");

  if(props.projectname){
    setEnteredName(props.projectname);
  }

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    console.log(name);
  }

  return (
    <div onClick={props.closeHandler}>
      <Modal>
        <div className={styles.add_project_modal_container}>
          <div>
            <h1>Add project</h1>
          </div>
          <hr />

          <form onSubmit={formSubmitHandler}>
            <div className={styles.add_project_form}>
              <div className={styles.form_field}>
                <label
                  for="edit_project_modal_field_name"
                  className={styles.form_field_title}
                >
                  Name
                </label>
                <input
                  ref={nameInputRef}
                  id="edit_project_modal_field_name"
                  onChange={nameChangeHandler}
                  value={enteredName}
                ></input>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>Color</div>
                <button disabled="true" className={styles.color_selector}>
                  <div>
                    <span className={styles.color_dropdown_select_color}></span>
                    <span>Black</span>{" "}
                  </div>
                  <DownArrowIcon />
                </button>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>Workspace</div>
                <button disabled="true">My Projects</button>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>View</div>
                <fieldset>
                  <div className={styles.selected_view}>
                    <ListIcon />
                    List
                  </div>
                  <div>
                    <BoardIcon />
                    Board
                  </div>
                  <div>
                    <CalenderIcon />
                    Calender
                  </div>
                </fieldset>
              </div>
            </div>

            <hr />
            <footer className={styles.footer_btn}>
              <button
                onClick={props.closeHandler}
                className={styles.btn_cancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn_add} ${enteredName && styles.named_states} `  }
                disabled={enteredName ? false : true}
              >
                {props.projectname ? "Save" : "Add"}
              </button>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}
