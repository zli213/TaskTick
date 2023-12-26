import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";
import Notice from "../../../application/widgets/settingNotice";

const SetPassword = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [samePassword, setSamePassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isAllFilled, setAllFilled] = useState(false);
    const [backendMessage, setMessage] = useState("");

    //password requirements?
    //⬇️Update for every change
    const updateSubmitButton = (currentPassword, newPassword, confirmPassword) => {
        setSubmitDisabled(!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword);
    }

    //if not match, show a notification.
    useEffect(() => {
        setSamePassword(newPassword===confirmPassword);
    }, [newPassword, confirmPassword]);

    //if three inputs are filled, set it true
    useEffect (() => {
        setAllFilled(currentPassword && newPassword && confirmPassword);
    }, [currentPassword, newPassword, confirmPassword]);

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ currentPassword, confirmPassword })}
            );
            
            if (res.ok) {
                router.push('/application/setting/account');
            } else {
                const data = await res.json();
                setMessage(data.message);
                return;
            }
        } catch (error) {
            console.log("Error occured: ", error);
        }
        
    }

    //click cancel button
    const clickCancel = () => {
        if (isAllFilled) {
            setShowModal(true);
        } else {
            router.push('/application/setting/account');
        }
    };

    return (
        <div className={styles.container}>
            <header>
                <span>
                    <a onClick={() => router.push('/application/setting/account')}>
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

            <span>
                <p className={backendMessage ? styles.visible : styles.hidden}>{backendMessage}</p>
            </span>

            <div className={styles.buttonGroup}>
                <button type="button" className={styles.cancelButton} onClick={clickCancel}>Cancel</button>
                <button type="button" disabled={submitDisabled} onClick={handleSubmit} className={submitDisabled ? styles.cannotSubmit : styles.canSubmit}>Submit</button>
            </div>
        </form>

        <Notice
            isOpen={isAllFilled && showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => { setShowModal(false), router.push('/application/setting/account') }}
            promptText={'Your inputs would not be saved.'}
        />

        </div>
        
    );

}

export default SetPassword;