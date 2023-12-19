import React, { useState, useEffect } from "react";
import styles from "../../../../styles/scss/account.module.scss";

const SetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [samePassword, setSamePassword] = useState(false);

    //password requirements?
    //⬇️Update for every change
    const updateSubmitButton = (currentPassword, newPassword, confirmPassword) => {
        const isAllFilled = newPassword && confirmPassword && currentPassword;
        setSubmitDisabled(!isAllFilled || !samePassword);
    }

    //if not match, show a notification.
    useEffect(() => {
        setSamePassword(newPassword===confirmPassword);
    }, [newPassword, confirmPassword]);

    const handleCurPassword = (event) => {
        setCurrentPassword(event.target.value);
        updateSubmitButton(event.target.value, newPassword, confirmPassword);
    };

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
        updateSubmitButton(currentPassword, event.target.value, confirmPassword);
    }

    const handleConfirm = (event) => {
        setConfirmPassword(event.target.value);
        updateSubmitButton(currentPassword, newPassword, event.target.value);
    }


    //submit the form
    async function handleSubmit () {
        try {
            const res = await fetch("/api/password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ currentPassword, confirmPassword })}
            )
            if (res.ok) {
                console.log("Password updates completed.")
            } else {
                console.log("Something goes wrong...")
            }
        } catch (error) {
            console.log("Error occured: ", error);
        }
        
    }

    return (
        <div className={styles.container}>
            <header>
                <span>
                    <a href="/application/setting/account">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="1" y1="12" x2="8" y2="20" />
                            <line x1="1" y1="12" x2="8" y2="4" />
                            <line x1="1" y1="12" x2="24" y2="12" />
                        </svg>
                    </a>
                    <label>Modify your password</label>
                </span>

                {/* need to be fixed. click & close the modal */}
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </a>
            </header>

        <form className={styles.subsettingForm}>
            <div>
                <label>Current password</label>
                <input type="password" value={currentPassword} onChange={handleCurPassword}/>
            </div>

            <div>
                <label>Set a new password</label>
                <input type="password" value={newPassword} onChange={handleNewPassword}/>
            </div>

            <div>
                <label>Confirm your new password</label>
                <div className={styles.smallGroup}>
                    <input type="password" value={confirmPassword} onChange={handleConfirm}/>
                    <p className={samePassword ? styles.hidden : styles.visible}>Passwords do not match</p>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button type="reset" className={styles.cancelButton}>Cancel</button>
                <button type="submit" disabled={submitDisabled} onClick={handleSubmit} className={submitDisabled ? styles.cannotSubmit : styles.canSubmit}>Submit</button>
            </div>
        </form>
        </div>
        
    );

}

export default SetPassword;