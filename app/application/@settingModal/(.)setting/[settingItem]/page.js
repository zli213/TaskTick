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
        <div className={styles.setting_right}>{activePage}</div>
      </div>
    </Modal>
  );
}
