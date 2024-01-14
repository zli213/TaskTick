import Link from "next/link";
import Navbar from "../components/pages/Navbar";
import "../styles/scss/globals.scss";
import ModeToggle from "../components/application/widgets/ToggleButton";

export default function Home() {
  return (
    <div className="homeContainer antialiased font-sans text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-900 w-full">
      <ModeToggle/>
      <div>
        <Navbar />
      </div>
      <div className="slogan">
        <h1 className="slogan_h1">Organize your work</h1>
        <h1 className="slogan_h1">and life, finally.</h1>
        <p className="slogan_p">
          Become focused, organized, and calm with Todoist. The world’s #1
        </p>
        <p className="slogan_p">task manager and to-do list app.</p>
        <Link href="/login">
          <button className="standard-button">Start for free</button>
        </Link>
        <div className="background">
          <img src="/images/landpage_background.jpg" alt="background" />
        </div>
      </div>
    </div>
  );
}
