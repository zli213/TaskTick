"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../../../../../components/application/widgets/Modal";
import SettingAccount from "../../../../../components/pages/Settings/Account";
import SettingTheme from "../../../../../components/pages/Settings/Theme";
import styles from "../../../../../styles/scss/settings.module.scss";
import CatchAll from "../../[...catchAll]/page";

export default function SettingModal({ params }) {
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    switch (params.settingItem) {
      case "account":
        setActivePage(<SettingAccount />);
        break;
      case "theme":
        setActivePage(<SettingTheme />);
        break;
      default:
        setActivePage(<CatchAll />);
        break;
    }
  }, [params]);

  return (
    <Modal>
      <div className={styles.setting_left}>
        <h2>Settings</h2>
        <div>Search</div>
        <ul>
          <li>
            <Link href="/application/setting/account" scroll={false}>
              account
            </Link>
          </li>
          <li>
            <Link href="/application/setting/theme" scroll={false}>
              theme
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.setting_right}>
        {activePage}
      </div>
    </Modal>
  );
}
