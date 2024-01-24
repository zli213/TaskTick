/***
 * The card you can add or edit projects
 *
 * Alart: now it only can add now project
 */

"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import styles from "../../../styles/scss/components/application/widgets/newProject.module.scss";
import Icon from "../widgets/Icon";
import { useRouter } from "next/navigation";

//Custom React hook -> useProject
export const useProject = () => {
  const [showAddProjectCard, setShowProjectAddCard] = useState(false);

  const showProjectCardHandler = () => {
    setShowProjectAddCard((preState) => !preState);
  };

  return {
    showAddProjectCard,
    showProjectCardHandler,
  };
};

export default function NewProject(props) {
  const router = useRouter();
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState(props.name ? props.name : "");
  const [isWrong, setIsWrong] = useState(false);

  const disableScroll = (event) => {
    event.preventDefault();
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;

    if (props.name) {
      //Edit project
      try {
        const res = await fetch("/api/editProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            id: props.projectId,
            oldName: props.name,
          }),
        });

        if (res.ok) {
          props.showNameHandler(name);
          window.location.reload();
        } else {
          setIsWrong(true);
        }
      } catch (error) {
        throw error;
      }
      props.closeHandler();
    } else {
      //Add project
      try {
        const res = await fetch("/api/addProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
        const result = await res.json();

        if (res.ok) {
          router.push(`/application/project/${result.body.projectId}`);
          router.refresh();
        } else {
          setIsWrong(true);
        }
      } catch (error) {
        throw error;
      }
      props.closeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", disableScroll, { passive: false });
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);

  return (
    <div onClick={props.closeHandler}>
      <Modal>
        <div className={styles.add_project_modal_container}>
          <div>
            <h1>{props.name ? "Edit" : "Add"} project</h1>
          </div>
          <hr />

          <form onSubmit={formSubmitHandler}>
            <div className={styles.add_project_form}>
              <div className={styles.form_field}>
                <label className={styles.form_field_title}>Name</label>
                <input
                  ref={nameInputRef}
                  id="edit_project_modal_field_name"
                  onChange={nameChangeHandler}
                  value={enteredName}
                ></input>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>Color</div>
                <button disabled={true} className={styles.color_selector}>
                  <div>
                    <span className={styles.color_dropdown_select_color}></span>
                    <span>Black</span>{" "}
                  </div>
                  <Icon type="down_arrow" />
                </button>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>Workspace</div>
                <button disabled={true}>My Projects</button>
              </div>
            </div>

            <hr />
            <footer className={styles.footer_btn}>
              {isWrong && (
                <div className={styles.save_wrong}>Oops, something Wrong</div>
              )}
              <button
                onClick={props.closeHandler}
                className={styles.btn_cancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn_add} ${
                  enteredName && styles.named_states
                } `}
                disabled={enteredName ? false : true}
              >
                {props.name ? "Save" : "Add"}
              </button>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}
