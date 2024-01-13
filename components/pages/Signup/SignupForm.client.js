"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/scss/form.module.scss";

const SignupForm = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
          } catch (error) {
            setErrorMessage(
              "An error occurred, and the server didn't send any additional information."
            );
          }
        } else {
          setErrorMessage(
            "An error occurred, and the server's response was not in JSON format."
          );
        }
      } else {
        router.refresh();
        router.push("/auth/signin");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      const atIndex = value.indexOf("@");
      if (atIndex > 0) {
        const extractedName = value.substring(0, atIndex);
        setFormData((prevState) => ({
          ...prevState,
          name: extractedName,
          [name]: value,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <form className={styles.signupForm} onSubmit={handleSubmit} method="post">
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <button className={styles.submit}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
