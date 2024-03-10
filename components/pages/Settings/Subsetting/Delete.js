import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/account.module.scss";
import Icon from "../../../application/widgets/Icon";

const DeleteAccount = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [backendMessage, setMessage] = useState("");

  useEffect(() => {
    if (password) {
      setDeleteDisabled(false);
    }
  }, [password]);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

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
          <button onClick={() => router.push("/application/setting/account")} id="option_link11">
            <Icon type="left_arrow" id="icon21"/>
          </button>
          <label>Modify your password</label>
        </span>

        <button onClick={onDismiss} id="option_link12">
          <Icon type="close" />
        </button>
      </header>

      <form className={styles.subsettingForm}>
        <div>
          <p>
            We're sorry we can no longer travel with you, but thank you so much
            for giving Todoist a try!
          </p>
        </div>
        <div>
          <p>
            You will have your account permanently deleted. All your data will
            be erased immediately and you will no longer be able to restore
            them.
          </p>
        </div>
        <div>
          <label>Reason for deletion (optional)</label>
          <textarea></textarea>
        </div>
        <div>
          <label>Application Password</label>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <div>
          {/* dispay messages from backend */}
          <p className={backendMessage ? styles.visible : styles.hidden} id="content_holder4">
            {backendMessage}
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push("/application/setting/account")}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteDisabled}
            className={deleteDisabled ? styles.cannotSubmit : styles.canSubmit}
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
