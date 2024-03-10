import React from "react";
import SignupForm from "../../../components/pages/Signup/SignupForm.client";
import Navbar from "../../../components/pages/Navbar";
import styles from "../../../styles/scss/form.module.scss";


const Signup = () => {
  return (
    <div className={styles.container_root}>
      <Navbar />
      <SignupForm />
    </div>
  );
};

export default Signup;
