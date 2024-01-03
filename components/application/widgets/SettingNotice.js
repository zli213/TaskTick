import React from "react";
import styles from "../../../styles/scss/components/application/widgets/settingNotice.module.scss";
import Close from "../../../public/icon/close.svg";

function Notice ({ isOpen, onClose, onConfirm, promptText}) {
    return (
        isOpen && (
            <>
            <div className={styles.mask}></div>
            <div className={styles.noticeContainer}>
                <header className={styles.noticeHeader}>
                    <label>Discard Changes?</label>
                    <button>
                        <Close onClick={onClose}/>
                    </button>
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