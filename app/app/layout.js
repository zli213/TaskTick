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
                <span>🫡 收件箱</span>
                <span>3</span>
              </li>
              <li>
                <span>🫡 今天</span>
                <span>4</span>
              </li>
              <li>
                <span>🫡 预览</span>
              </li>
              <li>
                <span>🫡 过滤器&标签</span>
              </li>
            </ul>
          </div>
          <div>
            <div>项目</div>
            <div>
                <ul>
                    <li>我的工作</li>
                    <li>家庭</li>
                </ul>
            </div>
          </div>
        </div>
        <main className="main_content">{children}</main>
      </div>
    </>
  );
}
