"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../../../../../components/application/widgets/Modal";
import SettingAccount from "../../../../../components/pages/Settings/Account";
import SettingTheme from "../../../../../components/pages/Settings/Theme";
import { useRouter } from "next/navigation";
import styles from "../../../../../styles/scss/settings.module.scss";

export default function SettingModal({ params }) {
  const router = useRouter;
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    switch (params.settingItem) {
      case "account":
        setActivePage(<SettingAccount />);
        break;
      case "theme":
        setActivePage(<SettingTheme />);
        break;
    }
  }, [params]);

  const pushNav = () => {
    router.push("/application/today");
  };

  return (
    <Modal>
      <div className={styles.setting_left}>
        <h2>Settings</h2>
        <div>Search</div>
        <div>
          <ul>
            <li>
              <Link href="/application/setting/account">account</Link>
            </li>
            <li>
              <Link href="/application/setting/theme">theme</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>this is setting modal</h2>
        <div>{activePage}</div>
      </div>
    </Modal>
  );
}
