import TodoList from "../../application/widgets/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

function FilterPage() {
  return (
    <>
      <h1>Filter Page</h1>
      <TodoList datas={DUMMY_TASKS} />;
    </>
  );
}

export default FilterPage;
