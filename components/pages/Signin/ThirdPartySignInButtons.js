/**
 * @desc This module provides a component that renders the third-party sign-in buttons.
 * @param {function} handleSignIn - The function that handles the sign-in process.
 * @param {object} styles - The styles object.
 * @returns {JSX} The third-party sign-in buttons.
 */
import React from "react";
import Icon from "../../application/widgets/Icon";

const ThirdPartySignInButtons = ({ handleSignIn, styles }) => {
  return (
    <div className={styles.third_party_accout}>
      <div className={styles.dividerWithText}>
        <span>OR</span>
      </div>
      <button className={styles.google} onClick={() => handleSignIn("google")}>
        <Icon type="google" className={styles.icon} />
        Continue with Google
      </button>

      <button className={styles.github} onClick={() => handleSignIn("github")}>
        <Icon type="github" className={styles.icon} />
        Continue with GitHub
      </button>
    </div>
  );
};

export default ThirdPartySignInButtons;
