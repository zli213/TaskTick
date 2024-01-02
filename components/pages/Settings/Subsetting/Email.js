import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";
import Notice from "../../../application/widgets/settingNotice";
import LeftArrow from "../../../../public/icon/left_arrow.svg";
import CancelButton from "../../../../public/icon/close.svg";

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

    useEffect(() => {
        //if two email addresses are different, show a notification.
        setSameEmail(newEmail===confirmEmail);
        //if three inputs are filled, set it true
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
            const res = await fetch("/api/updateEmail", {
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

    const onDismiss = useCallback(() => {
        const currentPage = localStorage.getItem("lastPage");
        router.push(`/application/${currentPage}`, { scroll: false });
        router.refresh();
    }, [router]);


    return (
        <div className={styles.container}>
            <header>
                <span>
                    <button onClick={() => router.push("/application/setting/account")}>
                        <LeftArrow/>
                    </button>
                    <label>Modify your email address</label>
                </span>
                <button onClick={onDismiss}>
                    <CancelButton/>
                </button>
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