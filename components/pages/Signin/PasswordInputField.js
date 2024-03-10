/**
 * @desc This module provides a component that renders the password input field.
 * @param {object} formValues - The form values.
 * @param {function} handleChange - The function that handles the change event.
 * @param {boolean} isPasswordVisible - The state that determines whether the password is visible or not.
 * @param {function} handleVisibilityToggle - The function that handles the visibility toggle.
 * @param {object} styles - The styles object.
 * @returns {JSX} The password input field.
 */

import React from "react";
import Icon from "../../application/widgets/Icon";

const PasswordInputField = ({
  formValues,
  handleChange,
  isPasswordVisible,
  handleVisibilityToggle,
  styles,
}) => {
  return (
    <div className={styles.password_style}>
      <div className={styles.password_label}>
        <span className={styles.label}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
        </span>
      </div>
      <div className={styles.input_password}>
        <input
          required
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <div className={styles.visibility}>
          <button
            type="button"
            className={styles.visibility_btn}
            onClick={handleVisibilityToggle}
          >
            {isPasswordVisible ? (
              <Icon type="eye_on" className={styles.icon} />
            ) : (
              <Icon type="eye_off" className={styles.icon} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PasswordInputField;
