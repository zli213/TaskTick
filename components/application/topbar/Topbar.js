import Link from "next/link";

const BAR_STYLES = {
  padding: "3px 1rem",
  backgroundColor: "#dc4c3e",
  display: "flex",
  justifyContent: "space-between",
};

const Topbar = () => {
  return (
    <div style={BAR_STYLES}>
      <div>
        <a>Menu</a>
        <Link href="/application/inbox">Home</Link>
      </div>
      <div>
        <a>Add Task</a>
        <a>Avatar</a>
        <Link href="/application/setting/account">Setting</Link>
      </div>
    </div>
  );
};

export default Topbar;
