import React, { useState, useEffect } from "react";
import styles from "../../../styles/scss/account.module.scss";
import Link from "next/link";

const SettingAccount = () => {
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
        const response = await fetch("/api/account", { method: 'GET' });

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
  const inputChangeHandler =  (event) => {
    setInputValue(event.target.value);
  };

  //if inputValue changes, set buttons visible.
  useEffect(() => {
    console.log("inputValue Now: ", inputValue);
    setShowButton(inputValue !== username);
  }, [inputValue, username]);

  //help submit the form
  async function handleSubmit () {
    const res = await fetch("/api/account", {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue })
    });
    if (res.ok) {
      setUsername(inputValue);
    } else {
      const errorData = await res.json();
      setError(errorData.message || "Failed to save new username.");
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <h4>Account Information</h4>
        {/* need to be fixed. click & close the modal */}
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </a>
      </header>
      {userData ? (
        
        <form>
          <div>
            <label>Avatar</label>
            <span>Change your Avatar</span>
          </div>

          <div>
            <label>Username</label>
            <input value={inputValue} type="text" onChange={inputChangeHandler}/>
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
            <p>This will immediately delete all your data, including tasks, projects, comments, etc.</p>
            <p>This cannot be undone.</p>
            <span>
              Delete Account
            </span>
          </div>

          <div className={`${styles.submitButton} ${showButton ? styles.visible : styles.hidden}`}>
            {showButton && <button onClick={handleSubmit} type="button">Submit</button>}
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