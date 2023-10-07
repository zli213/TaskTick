import "./app.scss";
import { ListNav } from "../../components/layout/ListNav";
import Link from "next/link";

export default function ListLayout({ children }) {
  return (
    <>
      <ListNav />
      <div id="content-wrapper" className="list_content">
        <div id="left-sidebar" className="list_sidebar">
          <div id="top">
            <ul>
              <Link href="./inbox">
                <li>
                  <span>🫡 Indox</span>
                  <span>3</span>{" "}
                </li>
              </Link>
              <Link href="./today">
                <li>
                  <span>🫡 Today</span>
                  <span>4</span>
                </li>
              </Link>
              <Link href="./upcoming">
                <li>
                  <span>🫡 Preview</span>
                </li>
              </Link>
              <Link href='./filters-labels'>
                <li>
                  <span>🫡 Filter&Labels</span>
                </li>
              </Link>
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
