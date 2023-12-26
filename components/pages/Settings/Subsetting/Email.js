import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";
import Notice from "../../../application/widgets/settingNotice";

const SetEmail = () => {
    const router = useRouter();
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [sameEmail, setSameEmail] = useState(false);
    const [backendMessage, setMessage] = useState("");
    const [isAllFilled, setAllFilled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //Update for every change
    const updateSubmitButton = (newEmail, confirmEmail, password) => {
        setSubmitDisabled(!newEmail || !confirmEmail || !password || newEmail !== confirmEmail);
    }

    //if two email addresses are different, show a notification.
    useEffect(() => {
        setSameEmail(newEmail===confirmEmail);
    }, [newEmail, confirmEmail]);

    //if three inputs are filled, set it true
    useEffect (() => {
        setAllFilled(newEmail && confirmEmail && password);
    }, [newEmail, confirmEmail, password]);

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/email", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ password, confirmEmail })}
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
    };

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
                    <label>Modify your email address</label>
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

                <span>
                    <p className={backendMessage ? styles.visible : styles.hidden}>{backendMessage}</p>
                </span>

                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.cancelButton} onClick={clickCancel}>Cancel</button>
                    <button type="button" onClick={handleSubmit} disabled={submitDisabled} className={submitDisabled ? styles.cannotSubmit : styles.canSubmit}>Submit</button>
                </div>
            </form>

            <Notice
                isOpen={isAllFilled && showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setShowModal(false);
                    router.push('/application/setting/account')}}
                promptText={'Your inputs would not be saved.'}
            />
        </div>
        
    );
}

export default SetEmail;