import Link from "next/link";

export function ListNav() {
  return (
    <nav className="list_nav">
      <div className="flex_center">
        <div>Menu</div>
        <Link href="/app/today">Home</Link>
        <div>Search</div>
      </div>
      <div className="flex_center">
        <div>Add task</div>
        <div>Avatar</div>
      </div>
    </nav>
  );
}
