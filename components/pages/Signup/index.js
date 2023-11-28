// pages/signup.js 或其他页面文件
import React from 'react';
import SignupForm from './SignupForm.client'; // 确保路径是正确的

const Signup = () => {
  return (
    <>
      <div>
        <h1>Sign up</h1>
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
