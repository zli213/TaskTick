import React from "react";
import SignupForm from "../../../components/pages/Signup/SignupForm.client";
import Navbar from "../../../components/pages/Navbar";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Sign up</h1>
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
