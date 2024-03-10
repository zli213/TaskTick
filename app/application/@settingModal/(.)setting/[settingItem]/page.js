"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../../../../../components/application/widgets/Modal";
import SettingAccount from "../../../../../components/pages/Settings/Account";
import SettingTheme from "../../../../../components/pages/Settings/Theme";
import Account from "../../../../../public/icon/account.svg";
import AccountSelected from "../../../../../public/icon/account_selected.svg";
import Theme from "../../../../../public/icon/theme.svg";
import ThemeSelected from "../../../../../public/icon/theme_selected.svg";
import styles from "../../../../../styles/scss/settings.module.scss";
import CatchAll from "../../[...catchAll]/page";

export default function SettingModal({ params }) {
  const [activePage, setActivePage] = useState(null);
  const [selected, setSelected] = useState("account");

  useEffect(() => {
    switch (params.settingItem) {
      case "account":
        setActivePage(<SettingAccount />);
        setSelected("account");
        break;
      case "theme":
        setActivePage(<SettingTheme />);
        setSelected("theme");
        break;
      default:
        setActivePage(<CatchAll />);
        break;
    }
  }, [params]);

  return (
    <Modal>
      <div className={styles.setting_modal_container}>
        <div className={styles.setting_left} id="leftbar">
          <h2>Settings</h2>
          <ul>
            <li>
              <div
                className={`${styles.leftGroup} ${
                  selected === "account" ? styles.selected : ""
                }`}
                id="setting_item"
              >
                <Link href="/application/setting/account" scroll={false}>
                  <span>
                  {selected === "account" ? <AccountSelected /> : <Account />}
                  </span>
                  <span className={styles.list_item_content}>
                    Account
                  </span>
                </Link>
              </div>
            </li>
            <li>
              <div
                className={`${styles.leftGroup} ${
                  selected === "theme" ? styles.selected : ""
                }`}
                id="setting_item0"
              >
                <Link href="/application/setting/theme" scroll={false}>
                  <span>
                  {selected === "theme" ? <ThemeSelected/> : <Theme/>}
                  </span>
                  <span className={styles.list_item_content}>Theme</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.setting_right} id="setting_right">{activePage}</div>
      </div>
    </Modal>
  );
}
