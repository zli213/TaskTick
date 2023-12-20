import React from "react";
import styles from "../../../styles/scss/components/application/widgets/settingNotice.module.scss";

function Notice ({ isOpen, onClose, onConfirm, promptText}) {
    return (
        isOpen && (
            <>
            <div className={styles.mask}></div>
            <div className={styles.noticeContainer}>
                <header className={styles.noticeHeader}>
                    <label>Discard Changes?</label>
                    <a onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </a>
                </header>
                <p>{promptText}</p>
                <div className={styles.buttonGroup}>
                    <button onClick={onConfirm} className={styles.confirmButton}>Confirm</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
            </>
        )
    );
};

export default Notice;