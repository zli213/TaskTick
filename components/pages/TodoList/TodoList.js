// TodoList.js
// "use client";

import { SingleItems } from "../../layout/SingleItem";
import "./todolist.scss";

function TodoList({ datas }) {
  return (
    <div className="list_editor ">
      <section className="section">
        <div>
          <div>
            {datas.filter(data => (data.completed == false)). map((data) => (
              <SingleItems
                key={data._id}
                id={data._id}
                title={data.title}
                dueDate={data.dueDate}
                projectName={data.projectName}
                label={data.tags}
                description={data.description}
                priority={data.priority}
                projectId={data.projectId}
              />
            ))}
          </div>
          <div>New Task</div>
        </div>
      </section>
    </div>
  );
}

export default TodoList;
