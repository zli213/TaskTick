"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../../../../../../components/application/widgets/Modal";
import SetEmail from "../../../../../../components/pages/Settings/Subsetting/Email";
import SetPassword from "../../../../../../components/pages/Settings/Subsetting/Password";
import DeleteAccount from "../../../../../../components/pages/Settings/Subsetting/Delete";
import AccountSelected from "../../../../../../public/icon/account_selected.svg";
import Theme from "../../../../../../public/icon/theme.svg";
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
      <div className={styles.setting_modal_container}>
        <div className={styles.setting_left} id="leftbar0">
          <h2>Settings</h2>
          <ul>
            <li>
              <div
                className={`${styles.leftGroup} ${styles.selected}`}
                id="setting_item1"
              >
                <Link href="/application/setting/account" scroll={false}>
                  <span>
                    <AccountSelected/>
                  </span>
                  <span className={styles.list_item_content}>
                    Account
                  </span>
                </Link>
              </div>
            </li>
            <li>
              <div
                className={styles.leftGroup}
                id="setting_item2"
              >
                <Link href="/application/setting/theme" scroll={false}>
                  <span><Theme/></span>
                  <span className={styles.list_item_content}>Theme</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.setting_right} id="setting_right0">
          <div>{activePage}</div>
        </div>
      </div>
    </Modal>
  );
}
