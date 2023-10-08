// TodoList.js
// "use client";

import { SingleItems } from "../../layout/SingleItem";
import "./index.scss";

function TodoList({ datas }) {
  return (
    <div className="list_editor ">
      <section className="section">
        <div>
          <div>
            {datas.filter(data => (data.isChecked == false)). map((data) => (
              <SingleItems
                id={data.id}
                content={data.content}
                due={data.due}
                project={data.project}
                label={data.label}
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
