"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../../../../../../components/application/widgets/Modal";
import SetEmail from "../../../../../../components/pages/Settings/Subsetting/Email";
import SetPassword from "../../../../../../components/pages/Settings/Subsetting/Password";
import DeleteAccount from "../../../../../../components/pages/Settings/Subsetting/Delete";
import styles from "../../../../../../styles/scss/settings.module.scss";
import CatchAll from "../../../[...catchAll]/page";

export default function SettingModal({ params }) {
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    switch (params.subsettings) {
      case "email":
        setActivePage(<SetEmail />);
        break;
      case "password":
        setActivePage(<SetPassword />);
        break;
        case "deleteaccount":
          setActivePage(<DeleteAccount />);
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
        {/* <h2>this is setting modal</h2> */}
        <div>{activePage}</div>
      </div>
    </Modal>
  );
}
