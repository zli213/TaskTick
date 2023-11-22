import LeftbarItem from "./LeftbarItem";

const Leftbar = () => {
  return (
    <div>
      <LeftbarItem label="Inbox" link="/application/inbox" />
      <LeftbarItem label="Today" link="/application/today" />
    </div>
  );
};

export default Leftbar;
