import "./Settings.scss";

export default function SettingsCard({ subMenu, closeHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover grey_cover " onClick={closeHandler}>
      <div className="setting_container" onClick={containerClickHandler}>
        <div className="setting-left">
          <header>Settings</header>
          <div>Search</div>
          <div>
            <ul>
              <li>Account</li>
              <li>General</li>
              <li>Theme</li>
              <li>Sidebar</li>
            </ul>
          </div>
        </div>
        <form className="setting-right">
          <header>{subMenu}</header>
          <div>content</div>
        </form>
      </div>
    </div>
  );
}
