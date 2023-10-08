import { ListContentHeader } from "../../../components/layout/ListContentHeader";
import TodoList from "../../../components/pages/TodoList/index";

export const metadata = {
  title: "Today - Todo",
  description: "Your personal Todo list APP",
};

function Today() {
  return (
    <>
      <ListContentHeader title={"Today"} />
      <TodoList datas=""/>
    </>
  );
}

export default Today;
