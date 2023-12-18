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
        {/* need to be rerplaced by a close button pic */}
        <button type="button">Close</button>
      </header>
      {userData ? (
        <>
        <form>
          <div>
            <label>Username</label>
            <input value={inputValue} type="text" onChange={inputChangeHandler}/>
          </div>

          <div>
            <label>Email</label>
            <p>{userData.email}</p>
            <Link href="/application/setting/account/email">
                <span>Change Email Address</span>
            </Link>
          </div>

          <div>
            <label>Password</label>
            <Link href="/application/setting/account/password">
                <span>Change Password</span>
            </Link>
            
          </div>

          <div className={`${styles.submitButton} ${showButton ? styles.visible : styles.hidden}`}>
            {showButton && <button onClick={handleSubmit} type="button">Submit</button>}
          </div>

        </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SettingAccount;