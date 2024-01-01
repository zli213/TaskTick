import "./app.scss";
import { ListNav } from "../../components/layout/ListNav";

export default function ListLayout({ children }) {
  return (
    <>
      <ListNav />
      <div id="content-wrapper" className="list_content">
        <div id="left-sidebar" className="list_sidebar">
          <div id="top">
            <ul>
              <li>
                <span>🫡 Indox</span>
                <span>3</span>
              </li>
              <li>
                <span>🫡 Today</span>
                <span>4</span>
              </li>
              <li>
                <span>🫡 Preview</span>
              </li>
              <li>
                <span>🫡 Filter&Labels</span>
              </li>
            </ul>
          </div>
          <div>
            <div>Project</div>
            <div>
                <ul>
                    <li>My Work</li>
                    <li>Family</li>
                </ul>
            </div>
          </div>
        </div>
        <main className="main_content">{children}</main>
      </div>
    </>
  );
}
