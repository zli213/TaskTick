import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";
import Notice from "../../../application/widgets/settingNotice";
import Icon from "../../../application/widgets/Icon";

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
  const updateSubmitButton = (
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    setSubmitDisabled(
      !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword
    );
  };

  useEffect(() => {
    //if not match, show a notification.
    setSamePassword(newPassword === confirmPassword);
    //if three inputs are filled, set it true
    setAllFilled(currentPassword && newPassword && confirmPassword);
  }, [currentPassword, newPassword, confirmPassword]);

  const handleCurPassword = (event) => {
    setCurrentPassword(event.target.value);
    updateSubmitButton(event.target.value, newPassword, confirmPassword);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
    updateSubmitButton(currentPassword, event.target.value, confirmPassword);
  };

  const handleConfirm = (event) => {
    setConfirmPassword(event.target.value);
    updateSubmitButton(currentPassword, newPassword, event.target.value);
  };

  //submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, confirmPassword }),
      });

      if (res.ok) {
        router.push("/application/setting/account");
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
      router.push("/application/setting/account");
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
          <button onClick={() => router.push("/application/setting/account")} id="option_link">
            <Icon type="left_arrow" />
          </button>
          <label>Modify your password</label>
        </span>

        <button onClick={onDismiss} id="option_link">
          <Icon type="close"  id="icon"/>
        </button>
      </header>

      <form className={styles.subsettingForm}>
        <div>
          <label>Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurPassword}
          />
        </div>

        <div>
          <label>Set a new password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
          />
        </div>

        <div>
          <label>Confirm your new password</label>
          <div className={styles.smallGroup}>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirm}
            />
            <p className={samePassword ? styles.hidden : styles.visible}>
              Passwords do not match
            </p>
          </div>
        </div>

        <span>
          <p className={backendMessage ? styles.visible : styles.hidden}>
            {backendMessage}
          </p>
        </span>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={clickCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={submitDisabled}
            onClick={handleSubmit}
            className={submitDisabled ? styles.cannotSubmit : styles.canSubmit}
          >
            Submit
          </button>
        </div>
      </form>

      <Notice
        isOpen={isAllFilled && showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          router.push("/application/setting/account");
        }}
        promptText={"Your inputs would not be saved."}
      />
    </div>
  );
};

export default SetPassword;
