import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/scss/account.module.scss";
import Link from "next/link";
import Icon from "../../application/widgets/Icon";

const SettingAccount = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [username, setUsername] = useState("");

  //set user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/account", { method: "GET" });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setInputValue(data.username);
          setUsername(data.username);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //handle input changes
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  //if inputValue changes, set buttons visible.
  useEffect(() => {
    setShowButton(inputValue !== username);
  }, [inputValue, username]);

  //help submit the form
  async function handleSubmit() {
    const res = await fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });
    if (res.ok) {
      setUsername(inputValue);
    } else {
      const errorData = await res.json();
      setError(errorData.message || "Failed to save new username.");
    }
  }

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <div className={styles.container} id="account_container">
      <header>
        <h4>Account Information</h4>
        <button onClick={onDismiss} id="option_link">
          <Icon type="close_small" id="icon19"/>
        </button>
      </header>
      {userData ? (
        <form>
          <div>
            <label>Avatar</label>
            <span>Change your Avatar</span>
          </div>

          <div>
            <label>Username</label>
            <input
              value={inputValue}
              type="text"
              onChange={inputChangeHandler}
            />
          </div>

          <div>
            <label>Email</label>
            <p>{userData.email}</p>
            <span>
              <Link href="/application/setting/account/email">
                Change Email Address
              </Link>
            </span>
          </div>

          <div>
            <label>Password</label>
            <span>
              <Link href="/application/setting/account/password">
                Change Password
              </Link>
            </span>
          </div>

          <div>
            <label>Associated accounts</label>
            <span>Manage</span>
          </div>

          <div>
            <label>Delete account</label>
            <p>
              This will immediately delete all your data, including tasks,
              projects, comments, etc.
            </p>
            <p>This cannot be undone.</p>
            <span>
              <Link href="/application/setting/account/deleteaccount">
                Delete Account
              </Link>
            </span>
          </div>

          <div
            className={`${styles.submitButton} ${
              showButton ? styles.visible : styles.hidden
            }`}
            id="content_holder3"
          >
            {showButton && (
              <button onClick={handleSubmit} type="button">
                Submit
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SettingAccount;
