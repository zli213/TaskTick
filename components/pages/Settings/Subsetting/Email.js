import React, { useState, useEffect } from "react";
import styles from "../../../../styles/scss/account.module.scss";

const SetEmail = () => {
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [sameEmail, setSameEmail] = useState(false);

    const updateSubmitButton = (newEmail, confirmEmail, password) => {
        const isAllFilled = newEmail && confirmEmail && password;
        const matchOrNot = newEmail === confirmEmail;
        setSubmitDisabled(!isAllFilled || !matchOrNot);
    }

    //if two email addresses are different, show a notification.
    useEffect(() => {
        setSameEmail(newEmail===confirmEmail);
    }, [newEmail, confirmEmail]);

    const handleNewEmail = (event) => {
        setNewEmail(event.target.value);
        updateSubmitButton(event.target.value, confirmEmail, password);
    };

    const handleConfirmEmail = (event) => {
        setConfirmEmail(event.target.value);
        updateSubmitButton(newEmail, event.target.value, password);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        updateSubmitButton(newEmail, confirmEmail, event.target.value);
    };

    //submit the form
    async function handleSubmit () {
        try {
            const res = await fetch("/api/email", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ confirmEmail })}
            )
            if (res.ok) {
                console.log("Email updates completed.")
            } else {
                console.log("Something goes wrong...")
            }
        } catch (error) {
            console.log("Error occured: ", error);
        }
        
    }

    return (
        <div className={styles.container}>
        <>
        <form>
            <header>
                <span>
                <a href="/application/setting/account">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="1" y1="12" x2="8" y2="20" />
                        <line x1="1" y1="12" x2="8" y2="4" />
                        <line x1="1" y1="12" x2="24" y2="12" />
                    </svg>
                </a>
                    <label>Modify your email address</label>
                </span>
                {/* need to be fixed. click & close the modal */}
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </a>
            </header>

            <div>
                <label>New email address</label>
                <input type="email" value={newEmail} onChange={handleNewEmail}/>
            </div>

            <div>
                <label>Confirm new email address</label>
                <div className={styles.smallGroup}>
                    <input type="email" value={confirmEmail} onChange={handleConfirmEmail}/>
                    <p className={sameEmail ? styles.hidden : styles.visible}>Email addresses do not match</p>
                </div>
            </div>

            <div>
                <label>Verify your password</label>
                <input type="password" value={password} onChange={handlePassword}/>
            </div>

            <div className={styles.buttonGroup}>
                {/* need to be rerplaced by a pic */}
                <button type="reset" className={styles.cancelButton}>Cancel</button>
                <button type="submit" disabled={submitDisabled} onClick={handleSubmit} className={submitDisabled ? styles.cannotSubmit : styles.canSubmit}>Submit</button>
            </div>
        </form>
        </>
        </div>
        
    );
}

export default SetEmail;