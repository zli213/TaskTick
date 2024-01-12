/**
 * @description
 * Task name rich text box which can input tags with "@" symbol.
 *
 * @param
 * tags: tags of the task
 * taskName: text content of the task
 * allTags: all user tags that can be seleted
 * createNewTag: fn to create a new tag by click create btn in drop down list
 * recordTaskName: pass task name(string) after every input by a function
 * recordTaskTags: pass tags(list) after every input by a function
 *
 * @usage
 * <TaskNameInput
 *    tags={[]}
 *    taskName={""}
 *    allTags={[]}
 *    createNewTag={(newTag)=>{}}
 *    recordTaskName={(taskName)=>{}}
 *    recordTaskTage={(taskTags)=>{}}
 *  />
 */

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "../../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import TaskTagDropDown from "./TaskTagDropDown";

function TaskNameInput(
  // tags,
  // taskName,
  // allTags,
  // createNewTag,
  // recordTaskName,
  // recordTaskTags,
  props
) {
  //---------------- variables -----------------
  /** Record the key just pressed */
  let pressedKey = useRef("");
  /** The ref of taskName div. Used for adding event listener*/
  const taskNameRef = useRef(null);
  /** The ref of the drop down tag selection. Used for calling the function in TaskTagDropDown component. */
  const dropDownRef = useRef(null);
  /** used for record the tags changed by the check boxes that called by tag btn*/
  let newTags = useRef([...props.tags]);

  //------------- common functions ---------------
  /** Return the tags in the user tag list that are matched by inputing string. */
  const matchValue = (str) => {
    const matched = tagList.filter((item) => {
      const reg = new RegExp(`^${str}`, "i");
      return reg.test(item);
    });
    return matched;
  };

  //-------------- states ------------
  /** All user tags, which should be updated when new tag is created. */
  const [tagList, setTagList] = useState(props.allTags);
  /* call when new tag is created */
  const updateTagList = (taglist) => {
    setTagList(taglist);
  };

  /** Show/hide match selection. The flag indicates the state of the drop down tag list which will not be initialized by re-render.*/
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

  /** List of matched tags. For creating drop down list. */
  const [matchedTags, setMatchedTags] = useState(tagList);
  const updateMatchedTags = (taglist) => {
    setMatchedTags(taglist);
  };

  /** set true when the create tag btn at the bottom of the drop down list needs to be shown */
  const [isShowCreateTag, setIsShowCreateTag] = useState(false);

  /** The string is been matching. If the string is not exactly matched, the create tag btn needs to be shown. */
  const [matchingValue, setMatchingValue] = useState("");

  //--------- functions for interactive ------------
  /** When the task name input box enters text, record the tags and the text content  */
  const recordNameAndTag = () => {
    const allNodes = document.getElementById("taskName").childNodes;
    let tags = [];
    let name = "";
    // Traverse all the nodes.

    for (let key in allNodes) {
      const node = allNodes[key];
      // node type: 1-Element 3-Text
      if (node.nodeType === 1) {
        // If a node is "matched", the text content without first "@" is a tag.
        if (node.getAttribute("match-type") === "matched") {
          if (!tags.includes(node.textContent.substring(1))) {
            tags.push(node.textContent.substring(1));
          }
        }
        // If a node is "matching", it is regard as a part of text of the task name.
        else if (node.getAttribute("match-type") === "matching") {
          name += node.textContent;
        }
      }
      // If a node is text node, it is a part of text of the task name.
      if (node.nodeType === 3) {
        name += node.textContent;
      }
    }
    name = name.trim();
    name = name.replace(/\s+/g, " ");
    props.recordTaskName(name);
    props.recordTaskTags(tags);
    newTags.current = [...tags];
  };

  /** When selecting a tag in the dropdown tag list, replace the matching string to a defined tag.*/
  const onTagSelect = (tag) => {
    let sel = getSelection();
    const matchingNode = sel.anchorNode.parentNode;
    const textSpace = document.createTextNode("\u00a0");
    // add a &nbsp; text node after a tag to ensure the next input will be out of the span.
    // if the tag node is the last node of the div, just append the space text node.
    if (matchingNode === matchingNode.parentNode.lastChild) {
      matchingNode.parentNode.append(textSpace);
    } else {
      // if the tag node is not the last node, and if no space after it, add a space text node after it.
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
    // complete the tag node.
    matchingNode.setAttribute("match-type", "matched");
    matchingNode.textContent = `@${tag}`;

    // set range after the space.
    const newRange = document.createRange();
    newRange.setStart(matchingNode.nextSibling, 1);
    newRange.setEnd(matchingNode.nextSibling, 1);
    sel.removeAllRanges();
    sel.addRange(newRange);

    // hide drop down selector and record the task name text and tags.
    hideTagMatch();
    recordNameAndTag();
  };

  // if the create tag xxx is been clicked, form the string as a tag and save the tag to the user tags.
  const onCreateNewTag = (newTag) => {
    onTagSelect(newTag);
    props.createNewTag(newTag);
  };

  // call when tag checkboxes are changed
  const checkTags = (taglist) => {
    const tagsToBeDeleted = newTags.current.filter(
      (tag) => !taglist.includes(tag)
    );
    const tagsToBeAdded = taglist.filter(
      (tag) => !newTags.current.includes(tag)
    );
    const root = document.getElementById("taskName");
    const allNodes = root.childNodes;
    for (let key in allNodes) {
      const node = allNodes[key];
      // set matching span to be text node
      if (
        node.nodeType === 1 &&
        node.getAttribute("match-type") === "matching"
      ) {
        const textNode = document.createTextNode(node.textContent);
        root.replaceChild(textNode, node);
      }
      // process tag
      if (
        node.nodeType === 1 &&
        node.getAttribute("match-type") === "matched"
      ) {
        const thistag = node.textContent.substring(1);
        // if tag in the list of to be deleted, remove it.
        if (tagsToBeDeleted.includes(thistag)) {
          node.remove();
        }
      }
    }

    // add new tags to the end of the task name div
    tagsToBeAdded.forEach((item) => {
      let textspace = "\u00a0";
      let newtagspan = document.createElement("span");
      newtagspan.setAttribute("match-type", "matched");
      newtagspan.textContent = `@${item}`;
      root.appendChild(newtagspan);
      root.insertAdjacentText("beforeend", textspace);
    });
    // for (let idx in tagsToBeAdded) {
    //   let textspace = "\u00a0";
    //   let newtagspan = document.createElement("span");
    //   newtagspan.setAttribute("match-type", "matched");
    //   newtagspan.textContent = `@${tagsToBeAdded[idx]}`;
    //   root.appendChild(newtagspan);
    //   root.insertAdjacentText("beforeend", textspace);
    // }

    // update the current tags
    newTags.current = [...taglist];
    props.recordTaskTags(taglist);
  };

  //------------ useEffect -----------

  useEffect(() => {
    /** keydown event */
    const taskNameKeydown = (e) => {
      const sel = getSelection();
      const range = sel.getRangeAt(0);

      // the key arrowUp and arrowDown are used for selecting the tags in the dropdown list.
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.reduceOnIndex();
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.increaseOnIndex();
        }
      }

      // if the range go out of the matching tag span, make the matching tag as a text node.
      if (e.key === "ArrowLeft") {
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
      if (e.key === "ArrowRight") {
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          range.startOffset === sel.anchorNode.length
        ) {
          const text = sel.anchorNode;
          sel.anchorNode.parentElement.remove();
          range.insertNode(text);
          range.setStart(sel.anchorNode, sel.getRangeAt(0).startOffset + 1);
          range.collapse(false);
          hideTagMatch();
        }
      }

      // press enter to select or create a tag when drop down list is shown.
      if (e.key === "Enter") {
        e.preventDefault();
        if (isShowTagMatchFlag.current) {
          dropDownRef.current.selectTag();
        }
      }

      // if press Backspace when the range after the "@" of a tag, make the tag to be the matching mode.
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
      // record the pressed key for further process in the input event.
      pressedKey.current = e.key;
      return () => {
        taskNameRef.current?.removeEventListener("keydown", taskNameKeydown);
      };
    };

    /** input event */
    const taskNameInput = () => {
      const k = pressedKey.current;
      const sel = getSelection();
      const range = sel.getRangeAt(0);

      // if it is not in a matching span when comes a new input, make the matching span (if exist) to be a text node.
      if (sel.anchorNode.parentNode.getAttribute("match-type") != "matching") {
        const root = document.getElementById("taskName");
        const allNodes = root.childNodes;
        for (let key in allNodes) {
          const node = allNodes[key];
          if (
            node.nodeType === 1 &&
            node.getAttribute("match-type") === "matching"
          ) {
            const textNode = document.createTextNode(node.textContent);
            root.replaceChild(textNode, node);
          }
        }
        hideTagMatch();
      }

      // When the new input is in a matching or matched span, continue matching.
      // If the cursor(range) is between two nodes, it is regard as in the former node with the offset equal to the length of the text content.
      // The new input will be the last charater of the former node.
      // One special case is that the cursor is at the very beginning of the div, which is regard as in the first node with the offset 0
      // If use backspace to delete the only char of the first node, there will still be a "" text node left.
      // While then comes a new input, it will be in the second node.
      if (sel.anchorNode.parentNode.hasAttribute("match-type")) {
        // The range.startOffset === 1 means the range is in the very front of the div,
        // which is the only case that the cursor is in the front and inside a span
        if (k != "Backspace" && range.startOffset === 1) {
          // the new character will be the first character of the span. Delete it and insert a new node before the span
          sel.anchorNode.textContent = sel.anchorNode.textContent.substring(1);
          if (k === "@") {
            // prepare to add a tag
            const tagspan = document.createElement("span");
            tagspan.setAttribute("match-type", "matching");
            tagspan.textContent = "@";
            sel.anchorNode.parentNode.parentNode.insertBefore(
              tagspan,
              sel.anchorNode.parentNode
            );
            const newrange = document.createRange();
            newrange.setStart(tagspan.childNodes[0], 1);
            newrange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newrange);
            showTagMatch();
          } else {
            // insert a text node
            sel.anchorNode.parentNode.parentNode.insertAdjacentText(
              "afterbegin",
              k === " " ? "\u00a0" : k
            );
          }
        } else {
          // to make sure when the last char is deleted, the node is also deleted (no empty text node left).
          if (sel.anchorNode.parentNode.previousSibling) {
            if (sel.anchorNode.parentNode.previousSibling.textContent === "") {
              sel.anchorNode.parentNode.previousSibling.remove();
            }
          }
          /* when delete all the characters before the first tag, the range will be in the first tag.
           * In this case, we don't want to call matching. */
          if (
            k === "Backspace" &&
            !sel.anchorNode.parentNode.previousSibling &&
            range.startOffset === 0
          ) {
            sel.removeAllRanges();
            sel.addRange(range);
          } else {
            /* otherwise, start matching when one of the tag character is deleted. */
            sel.anchorNode.parentNode.setAttribute("match-type", "matching");
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
      // use "@" to call matching tags. If in the matching span, the "@" is regard as a letter of the tag.
      if (k === "@") {
        if (!sel.anchorNode.parentNode.hasAttribute("match-type")) {
          /* surround @ with span tags and add match-type attribute */
          const matchingRange = document.createRange();
          matchingRange.setStart(sel.anchorNode, range.startOffset - 1);
          matchingRange.setEnd(sel.anchorNode, range.endOffset);
          const span = document.createElement("span");
          span.setAttribute("match-type", "matching");
          matchingRange.surroundContents(span);

          /* set cursor in the span and after @ */
          let cursorRange = document.createRange();
          cursorRange.setStart(span.childNodes[0], 1);
          cursorRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(cursorRange);

          // show drop down list
          showTagMatch();
          // hide create tag btn
          setIsShowCreateTag(false);
          updateMatchedTags(tagList);
          return;
        }
      }

      // When input a space in a matching span,
      // if the text is matched to a tag, set the span as a matched tag
      // if not, set the span as a text node.
      if (k === " ") {
        // if in a tag matching span and the cursor is at the end.
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          range.startOffset === sel.anchorNode.length
        ) {
          const matchingNode = sel.anchorNode.parentNode;
          // if tag matched
          if (tagList.includes(matchingNode.textContent.substring(1).trim())) {
            const textSpace = document.createTextNode("\u00a0");
            // add a &nbsp; text node after a tag to ensure the next input will be out of the span.
            // if the tag node is the last node of the div, just append the space text node.
            if (matchingNode === matchingNode.parentNode.lastChild) {
              matchingNode.parentNode.append(textSpace);
            } else {
              // if the tag node is not the last node, and if no space after it, add a space text node after it.
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
            // set the span as a matched tag
            matchingNode.setAttribute("match-type", "matched");
            matchingNode.textContent = matchingNode.textContent.trim();

            // set cursor to the next space
            let newRange = document.createRange();
            newRange.setStart(sel.anchorNode.nextSibling, 1);
            newRange.setEnd(sel.anchorNode.nextSibling, 1);
            sel.removeAllRanges();
            sel.addRange(newRange);
          } else {
            // if tag not matched, make the span to be a text node
            const textNode = document.createTextNode(
              sel.anchorNode.textContent
            );
            document
              .getElementById("taskName")
              .replaceChild(textNode, sel.anchorNode.parentNode);

            // set cursor to the end of the text node
            let newRange = document.createRange();
            newRange.setStartAfter(textNode);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
          hideTagMatch();
          return;
        }
      }

      // if in a matching span, show drop down list and update the list when inputing.
      if (sel.anchorNode.parentNode.getAttribute("match-type") === "matching") {
        showTagMatch();
        updateMatchedTags(
          matchValue(sel.anchorNode.parentNode.textContent.substring(1))
        );
        // used for the creat tag btn.(display create tag xxx)
        setMatchingValue(sel.anchorNode.parentNode.textContent.substring(1));
        // if matched a tag or the string is empty, hide the create tag btn
        if (
          tagList.includes(
            sel.anchorNode.parentNode.textContent.substring(1)
          ) ||
          sel.anchorNode.parentNode.textContent.substring(1) === ""
        ) {
          setIsShowCreateTag(false);
        } else {
          // else, show the create tag btn
          setIsShowCreateTag(true);
        }
        return;
      }
      // record task name and tags at evety input event.
      recordNameAndTag();
      return () => {
        taskNameRef.current?.removeEventListener("input", taskNameInput);
      };
    };

    // when use mouse to change the position of the cursor, if not in matching, hide drop down list.
    const mousedown = (e) => {
      const sel = getSelection();
      if (sel.anchorNode != null && sel.anchorNode.parentNode != null) {
        if (
          sel.anchorNode.parentNode.getAttribute("match-type") === "matching" &&
          isShowTagMatchFlag.current
        ) {
          return;
        } else {
          setIsShowTagMatch(false);
        }
      } else {
        setIsShowTagMatch(false);
      }
      return () => {
        document.removeEventListener("selectionchange", mousedown);
      };
    };

    // when task name div blured (click an other element), hide drop down list.
    // if add blur event listener, the drop down list will hide first so that the btns can not be clicked.
    const taskNameBlur = (e) => {
      if (document.activeElement.getAttribute("id") != "taskName") {
        setIsShowTagMatch(false);
      }
      return () => {
        document.removeEventListener("click", taskNameBlur);
      };
    };

    taskNameRef.current?.addEventListener("keydown", taskNameKeydown);
    taskNameRef.current?.addEventListener("input", taskNameInput);
    document.addEventListener("selectionchange", mousedown);
    document.addEventListener("click", taskNameBlur);
  }, []);

  useImperativeHandle(props.onRef, () => {
    return {
      checkTags: checkTags,
    };
  });

  return (
    <>
      <div
        id="taskName"
        className={styles.task_name}
        contentEditable="true"
        ref={taskNameRef}
        placeholder="Task Name"
      >
        {props.tags.map((item) => (
          <>
            <span key={item} match-type="matched">
              {"@" + item}
            </span>
            {"\u00a0"}
          </>
        ))}
        {props.taskName}
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
