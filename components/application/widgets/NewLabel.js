"use client";

import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/newLabel.module.scss";
import Icon from "./Icon";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addTag, editOneTagAction } from "../../../store/labels";

//Custom React hook -> useLabel
export const useLabel = () => {
  const [showAddCard, setShowAddCard] = useState(false);

  const showCardHandler = () => {
    setShowAddCard((preState) => !preState);
  };

  return {
    showAddCard,
    showCardHandler,
  };
};

//Edit label card
export default function NewLabel(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const tagInputRef = useRef();
  const [enteredTag, setEnteredTag] = useState(props.label ? props.label : "");
  const [isWrong, setIsWrong] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const disableScroll = (event) => {
    event.preventDefault();
  };

  //Add or edit label
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tag = tagInputRef.current.value.trim();

    if (props.label) {
      //Edit label
      try {
        const res = await fetch("/api/editTag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag, oldTag: props.label }),
        });
        const result = await res.json();

        if (res.ok) {
          props.closeHandler();
          dispatch(editOneTagAction( props.label,  tag ));
        } else {
          setIsWrong(true);
        }
      } catch (error) {
        console.log("Error occured: ", error);
      }
    } else {
      //Add new label
      try {
        const res = await fetch("/api/addTag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag }),
        });

        const result = await res.json();

        if (res.ok) {
          dispatch(addTag(tag));
          router.push(`/application/label/${tag}`);
        } else {
          setIsWrong(true);
        }
      } catch (error) {
        console.log("Error occured: ", error);
      }
      props.closeHandler();
    }
  };

  if (props.tag) {
    setEnteredTag(props.projectName);
  }

  //check duplicate tag
  const tagChangeHandler = async (event) => {
    const tag = event.target.value;
    setEnteredTag(tag);

    try {
      const res = await fetch("/api/checkTagExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag }),
      });
      const result = await res.json();

      if (result.status == 400) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };

  useEffect(() => {
    tagInputRef.current.focus();
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
        <div className={styles.add_label_modal_container} id="add_label">
          <div>
            <h1>{props.label ? "Edit" : "Add"} label</h1>
          </div>
          <hr />

          <form onSubmit={formSubmitHandler}>
            <div className={styles.add_tag_form}>
              <div className={styles.form_field}>
                <label
                  htmlFor="edit_tag_modal_field_name"
                  className={styles.form_field_title}
                >
                  <span>Label Name</span>
                  {isDuplicate && (
                    <span className={styles.form_field_title_warning}>
                      Label already exists.
                    </span>
                  )}
                </label>
                <input
                  ref={tagInputRef}
                  id="edit_tag_modal_field_name"
                  onChange={tagChangeHandler}
                  value={enteredTag}
                  maxLength="60"
                ></input>
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_field_title}>Label color</div>
                <button disabled={true} className={styles.color_selector}>
                  <div>
                    <span className={styles.color_dropdown_select_color}></span>
                    <span>Black</span>{" "}
                  </div>
                  <Icon type="down_arrow" />
                </button>
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
                id="btn_cancel0"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn_add} ${
                  enteredTag && !isDuplicate && styles.named_states
                } `}
                disabled={enteredTag && !isDuplicate ? false : true}
              >
                {props.label ? "Save" : "Add"}
              </button>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}
