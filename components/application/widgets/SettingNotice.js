import React from "react";
import styles from "../../../styles/scss/components/application/widgets/settingNotice.module.scss";

function Notice ({ isOpen, onClose, onConfirm, promptText}) {
    return (
        isOpen && (
            <>
            {/* mask not working */}
            <div className={styles.mask}></div>
            <div className={styles.noticeContainer}>
                <p>{promptText}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
            </>
        )
    );
};

export default Notice;