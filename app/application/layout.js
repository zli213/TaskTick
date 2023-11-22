import Leftbar from "../../components/application/leftbar/Leftbar";
import Topbar from "../../components/application/topbar/Topbar";

export default async function AppLayout(props) {
  return (
    <>
      <Topbar />
      <div id="app-holder">
        <Leftbar />
        <div>{props.children}</div>
      </div>
      <div id="modal_box">{props.settingModal}</div>
    </>
  );
}
