/**
 * @desc This module provides a component that renders the third-party sign-in buttons.
 * @param {function} handleSignIn - The function that handles the sign-in process.
 * @returns {JSX} The third-party sign-in buttons.
 */
import React from "react";
import Icon from "../../application/widgets/Icon";
// import styles from "../../../styles/scss/signin.module.scss";

const ThirdPartySignInButtons = ({ handleSignIn, styles }) => {
  return (
    <div>
      <div className={styles.dividerWithText}>
        <span>OR</span>
      </div>
      <div className={styles.google}>
        <a
          className={styles.google}
          style={{ backgroundColor: "#55acee" }}
          onClick={() => handleSignIn("google")}
          role="button"
        >
          <Icon type="google" className={styles.icon} />
          Continue with Google
        </a>
      </div>
      <div className={styles.github}>
        <a
          className={styles.github}
          style={{ backgroundColor: "#55acee" }}
          onClick={() => handleSignIn("github")}
          role="button"
        >
          <Icon type="github" className={styles.icon} />
          Continue with GitHub
        </a>
      </div>
    </div>
  );
};

export default ThirdPartySignInButtons;
