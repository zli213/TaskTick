'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import styles from './index.scss'; 

const SignupForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email);
    
    // 后端接收 API 
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data); // 测试输出
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
