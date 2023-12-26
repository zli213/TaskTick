import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";

const DeleteAccount = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [backendMessage, setMessage] = useState("");

    useEffect(() => {
        if(password) {
            setDeleteDisabled(false);
        }
    }, [password]);

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/deleteaccount", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ password })}
            );

            if (res.ok) {
                router.push("/");
            } else {
                const data = await res.json();
                setMessage(data.message);
                return;
            }
        } catch (error) {
            console.log("Error occured: ", error);
        }
    }

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
                    <p>We're sorry we can no longer travel with you, 
                        but thank you so much for giving Todoist a try!</p>
                </div>
                <div>
                <p>You will have your account permanently deleted. All your data will be erased immediately 
                        and you will no longer be able to restore them.</p>
                </div>
                <div>
                    <label>
                    Reason for deletion (optional)
                    </label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>Application Password</label>
                    <input type="password" value={password} onChange={handlePassword}/>
                </div>
                <div>
                    {/* dispay messages from backend */}
                <p className={backendMessage ? styles.visible : styles.hidden}>{backendMessage}</p>

                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.cancelButton} onClick={() => router.push("/application/setting/account")}>Cancel</button>
                    {/* not working */}
                    <button type="button" onClick={handleDelete} disabled={deleteDisabled} className={deleteDisabled ? styles.cannotSubmit : styles.canSubmit}>Delete Account</button>
                </div>

            </form>


        </div>
    );
}

export default DeleteAccount;