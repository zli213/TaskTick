/**
 * @description
 * task project dropdown selector
 *
 * @param
 *
 */

import styles from "../../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import Icon from "../Icon";

/**
 *
 * @param {*} onProjSelect fn(id, name, board)
 * @param {*} onOverlayClick fn()
 * @returns
 */
function ProjectSelector({ allProjects, onProjSelect, onOverlayClick }) {
  //console.log(allProjects);
  return (
    <>
      <div
        className={styles.popup_overlay}
        onClick={() => {
          onOverlayClick();
        }}
      ></div>
      <div className={styles.project_selector}>
        <ul>
          <li
            role="option"
            aria-selected="false"
            onClick={() => {
              onProjSelect("", "", "");
            }}
          >
            <Icon type="inbox" />
            Inbox
          </li>
          <li role="separator">My Projects</li>
          {allProjects.map((project) => (
            <>
              <li
                key={project.projectId}
                role="option"
                aria-selected="false"
                indent-level="1"
                onClick={() => {
                  onProjSelect(project.projectId, project.name, "");
                }}
              >
                <Icon type="hashtag" />
                {project.name}
              </li>
              {project.boards.map((board) => (
                <li
                  key={project.projectId + "-" + board}
                  role="option"
                  aria-selected="false"
                  indent-level="2"
                  onClick={() => {
                    onProjSelect(project.projectId, project.name, board);
                  }}
                >
                  <Icon type="board" />
                  {board}
                </li>
              ))}
            </>
          ))}
        </ul>
      </div>
      111
    </>
  );
}

export default ProjectSelector;
