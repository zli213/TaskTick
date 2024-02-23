/**
 * @dest This component renders the email input field.
 * @param {object} formValues - The form values.
 * @param {function} handleChange - The function that handles the change event.
 * @param {object} styles - The styles object.
 * @returns {JSX} The email input field.
 */
import React from "react";

const EmailInputField = ({ formValues, handleChange, styles }) => {
  return (
    <div className={styles.input_style}>
      <span className={styles.label}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
      </span>
      <input
        required
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={handleChange}
        placeholder="Enter your email..."
      />
    </div>
  );
};
export default EmailInputField;
