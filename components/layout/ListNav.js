import Link from "next/link";

export function ListNav() {
  return (
    <nav className="list_nav">
      <div className="flex_center">
        <div>菜单</div>
        <Link href="/app/today">Home</Link>
        <div>Search</div>
      </div>
      <div className="flex_center">
        <div>添加任务</div>
        <div>个人头像</div>
      </div>
    </nav>
  );
}
