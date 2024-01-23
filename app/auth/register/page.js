import React from "react";
import SignupForm from "../../../components/pages/Signup/SignupForm.client";
import Navbar from "../../../components/pages/Navbar";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div>
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
