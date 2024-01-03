/**
 * @description
 * Task name rich text box which can input tags with "@" symbol.
 */

import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import TaskTagDropDown from "./TaskTagDropDown";

function TaskNameInput({ tags, createNewTag }) {
  //const space = document.createTextNode(" ");

  const [tagList, setTagList] = useState(["aa", "bb", "ab"]);
  // call when new tag is created
  const updateTagList = (taglist) => {
    setTagList(taglist);
  };

  // Show/hide match selection
  const isShowTagMatchFlag = useRef(false);
  const [isShowTagMatch, setIsShowTagMatch] = useState(false);
  const showTagMatch = () => {
    setIsShowTagMatch(true);
    isShowTagMatchFlag.current = true;
  };
  const hideTagMatch = () => {
    setIsShowTagMatch(false);
    isShowTagMatchFlag.current = false;
  };

  // matched tags btn
  const [matchedTags, setMatchedTags] = useState(tagList);
  const updateMatchedTags = (taglist) => {
    setMatchedTags(taglist);
  };

  // set true when the create tag btn should be shown
  const [isShowCreateTag, setIsShowCreateTag] = useState(false);
  const showCreateTagBtn = () => {
    setIsShowCreateTag(true);
  };
  const hideCreateTagBtn = () => {
    setIsShowCreateTag(false);
  };

  const [matchingValue, setMatchingValue] = useState("");

  const dropDownRef = useRef(null);

  const onTagSelect = (tag) => {
    let sel = getSelection();
    const matchingNode = sel.anchorNode.parentNode;
    const textSpace = document.createTextNode("\u00a0");
    if (matchingNode === matchingNode.parentNode.lastChild) {
      matchingNode.parentNode.append(textSpace);
    } else {
      //console.log(matchingNode.nextSibling.textContent.charAt(0) === " ");
      if (
        matchingNode.nextSibling.textContent.charAt(0) != " " &&
        matchingNode.nextSibling.textContent.charAt(0) != "\u00a0"
      ) {
        matchingNode.parentNode.insertBefore(
          textSpace,
          matchingNode.nextSibling
        );
      }
    }
    matchingNode.setAttribute("match-type", "matched");
    matchingNode.textContent = `@${tag}`;

    const newRange = document.createRange();
    newRange.setStart(matchingNode.nextSibling, 1);
    newRange.setEnd(matchingNode.nextSibling, 1);
    sel.removeAllRanges();
    sel.addRange(newRange);
    hideTagMatch();
  };

  const onCreateNewTag = (newTag) => {
    onTagSelect(newTag);
    createNewTag(newTag);
  };

  // 匹配输入中的值是否在tagList里
  const matchValue = (str) => {
    const matched = tagList.filter((item) => {
      const reg = new RegExp(`^${str}`, "i");
      return reg.test(item);
    });
    return matched;
  };

  let pressedKey = useRef("");

  const taskNameRef = useRef(null);

  useEffect(() => {
    let currentMatchNode = null;
    let isMatching = false;

    const taskNameKeydown = (e) => {
      //console.log(e.code);
      const sel = getSelection();
      const range = sel.getRangeAt(0);
      if (e.key == "ArrowUp") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.reduceOnIndex();
        }
      }
      if (e.key == "ArrowDown") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.increaseOnIndex();
        }
      }
      if (e.key == "ArrowLeft") {
        //e.preventDefault();
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          range.startOffset === 1
        ) {
          const text = sel.anchorNode;
          sel.anchorNode.parentElement.remove();
          range.insertNode(text);
          hideTagMatch();
        }
      }
      if (e.key == "ArrowRight") {
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          range.startOffset === sel.anchorNode.length
        ) {
          const text = sel.anchorNode;
          sel.anchorNode.parentElement.remove();
          range.insertNode(text);
          range.setStart(sel.anchorNode, sel.getRangeAt(0).startOffset + 1);
          range.collapse(false);
          // console.log(sel.anchorNode);
          // console.log(sel.getRangeAt(0).startOffset);
          hideTagMatch();
        }
      }
      // if (range.startOffset === 0) {
      //   e.preventDefault();
      //   const inputChar = e.key;
      // }
      if (e.key === "Enter") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.selectTag();
        }
      }

      if (
        e.key === "Backspace" &&
        range.startOffset === 1 &&
        sel.anchorNode.parentNode.getAttribute("match-type") === "matched"
      ) {
        e.preventDefault();
        sel.anchorNode.parentNode.setAttribute("match-type", "matching");
        //sel.anchorNode.parentNode.classList.add(styles.tag_matched);
        showTagMatch();
        updateMatchedTags(
          matchValue(sel.anchorNode.parentNode.textContent.substring(1))
        );
      }
      pressedKey.current = e.key;
      // if (sel.anchorNode.parentNode.hasAttribute("match-type")) {
      //   sel.anchorNode.parentNode.setAttribute("match-type", "matching");
      //   isMatching = true;
      // }
      return () => {
        taskNameRef.current?.removeEventListener("keydown", taskNameKeydown);
      };
    };

    const taskNameInput = () => {
      const k = pressedKey.current;
      const sel = getSelection();
      const range = sel.getRangeAt(0);
      //console.log(range.startOffset);
      //console.log(sel.anchorNode.parentNode);
      //console.log(sel.anchorNode);
      if (sel.anchorNode.parentNode.hasAttribute("match-type")) {
        if (k != "Backspace" && range.startOffset === 1) {
          sel.anchorNode.textContent = sel.anchorNode.textContent.substring(1);
          sel.anchorNode.parentNode.parentNode.insertAdjacentText(
            "afterbegin",
            k === " " ? "\u00a0" : k
          );
        } else {
          /* when delete all the characters before the first tag, the range will be in the first tag. To avoid call matching, just return. */
          if (
            k === "Backspace" &&
            !sel.anchorNode.parentNode.previousSibling &&
            range.startOffset === 0
          ) {
            return;
          } else {
            /* otherwise, start matching when one of the tag character is deleted. */
            sel.anchorNode.parentNode.setAttribute("match-type", "matching");
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
      if (k === "@") {
        if (!sel.anchorNode.parentNode.hasAttribute("match-type")) {
          /* surround @ with span tags and add match-type attribute */
          const matchingRange = document.createRange();
          matchingRange.setStart(sel.anchorNode, range.startOffset - 1);
          matchingRange.setEnd(sel.anchorNode, range.endOffset);

          const span = document.createElement("span");
          span.setAttribute("match-type", "matching");
          matchingRange.surroundContents(span);
          //console.log(atRange.startContainer);
          /* set cursor in the span tag and after @ */
          let cursorRange = document.createRange();
          cursorRange.setStart(span.childNodes[0], 1);
          cursorRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(cursorRange);
          //console.log(sel.anchorNode.parentNode);
          showTagMatch();
          updateMatchedTags(tagList);
          return;
        }
      }

      if (k === "Backspace") {
        if (!sel.anchorNode.parentNode.hasAttribute("match-type")) {
          hideTagMatch();
        }
      }
      if (k === " ") {
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          range.startOffset === sel.anchorNode.length
        ) {
          const matchingNode = sel.anchorNode.parentNode;
          if (tagList.includes(matchingNode.textContent.substring(1).trim())) {
            const textSpace = document.createTextNode("\u00a0");
            if (matchingNode === matchingNode.parentNode.lastChild) {
              matchingNode.parentNode.append(textSpace);
            } else {
              if (
                matchingNode.nextSibling.textContent.charAt(0) != " " &&
                matchingNode.nextSibling.textContent.charAt(0) != "\u00a0"
              ) {
                matchingNode.parentNode.insertBefore(
                  textSpace,
                  matchingNode.nextSibling
                );
              }
            }
            matchingNode.setAttribute("match-type", "matched");
            //matchingNode.classList.add(styles.tag_matched);
            matchingNode.textContent = matchingNode.textContent.trim();

            // if exist next sibling, add a space before next sibling
            //console.log(sel.anchorNode.nextSibling);
            // if (sel.anchorNode.nextSibling) {
            //   sel.anchorNode.nextSibling.textContent =
            //     " " + sel.anchorNode.nextSibling.textContent;
            // } else {
            //   const textSpace = document.createTextNode("\u00a0"); //\u00a0: &nbsp; \u200b: noWidthSpace
            //   //console.log(document.getElementById("taskName"));
            //   // document
            //   //   .getElementById("taskName")
            //   //   .insertAdjacentElement("beforeend", textSpace);
            //   document.getElementById("taskName").appendChild(textSpace);
            // }
            //sel.anchorNode.parentNode.insertAdjacentText("afterend", "\u00a0");
            let newRange = document.createRange();
            newRange.setStart(sel.anchorNode.nextSibling, 1);
            newRange.setEnd(sel.anchorNode.nextSibling, 1);
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
          hideTagMatch();
          return;
        }
      }
      if (sel.anchorNode.parentNode.getAttribute("match-type") === "matching") {
        showTagMatch();
        updateMatchedTags(
          matchValue(sel.anchorNode.parentNode.textContent.substring(1))
        );
        setMatchingValue(sel.anchorNode.parentNode.textContent.substring(1));
        if (
          tagList.includes(sel.anchorNode.parentNode.textContent.substring(1))
        ) {
          setIsShowCreateTag(false);
        } else {
          setIsShowCreateTag(true);
        }
        return;
      }
      return () => {
        taskNameRef.current?.removeEventListener("input", taskNameInput);
      };
    };

    const mousedown = (e) => {
      const sel = getSelection();
      return () => {
        document.removeEventListener("selectionchange", mousedown);
      };
    };

    taskNameRef.current?.addEventListener("keydown", taskNameKeydown);
    taskNameRef.current?.addEventListener("input", taskNameInput);
    document.addEventListener("selectionchange", mousedown);
  }, []);

  return (
    <>
      <div
        id="taskName"
        className={styles.task_name}
        contentEditable="true"
        ref={taskNameRef}
        placeholder="Task Name"
      >
        {tags.map((item) => (
          <>
            <span
              key={item}
              match-type="matched"
              //className={styles.tag_matched}
            >
              {"@" + item}
            </span>{" "}
          </>
        ))}
        qqqqqq
      </div>
      {isShowTagMatch ? (
        <TaskTagDropDown
          tags={matchedTags}
          onTagSelect={(tag) => {
            onTagSelect(tag);
          }}
          showCreateTag={isShowCreateTag}
          matchingValue={matchingValue}
          createNewTag={(newTag) => {
            onCreateNewTag(newTag);
          }}
          ref={dropDownRef}
        />
      ) : null}
    </>
  );
}
export default TaskNameInput;
