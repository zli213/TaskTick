"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/scss/form.module.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import ThirdPartySignInButtons from "../Signin/ThirdPartySignInButtons";
import EmailInputField from "../Signin/EmailInputField";
import PasswordInputField from "../Signin/PasswordInputField";

const SignupForm = () => {
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpInitiated, setSignUpInitiated] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleVisibilityToggle = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };
  const handleSubmit = async (event) => {
    // clear any previous errors
    setError("");
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.status === 201) {
        // Handle successful response
        setNotification("User created successfully!");
        // Wait 5 seconds, then redirect to the sign in page
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
      } else {
        // Handle error responses
        const errorData = await response.json();
        setError(`Error response: ${errorData.message}`);
      }
    } catch (error) {
      // Handle fetch error
      setError("Fetch error:", error);
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
          role: "Email User",
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
          role: "Email User",
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const showNotification = (message) => {
    setNotification(message);
    // hide notification after 10 seconds
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };
  const handleSignUp = async (provider) => {
    signIn(provider, {
      redirect: false,
    });
    setSignUpInitiated(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const accountStatus = session?.user?.accountStatus;
      console.log("accountStatus: ", accountStatus);
      if (accountStatus === "created") {
        console.log("User created successfully!");
        router.push("/application/today");
      } else if (accountStatus === "existing_user") {
        router.push("/application/today");
      } else if (accountStatus === "existing_user_different_provider") {
        showNotification(
          "The email address has already been used. Please log in using the corresponding registration information!"
        );
      } else {
        showNotification(accountStatus);
      }
    };
    fetchData();
  }, [session, signUpInitiated]);
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} method="post">
        {error && <p className={styles.error}>{error}</p>}
        {notification && (
          <div style={{ color: "red", margin: "10px 0" }}>{notification}</div>
        )}

        <EmailInputField
          formValues={formData}
          handleChange={handleChange}
          styles={styles}
        />

        <PasswordInputField
          formValues={formData}
          handleChange={handleChange}
          isPasswordVisible={isPasswordVisible}
          handleVisibilityToggle={handleVisibilityToggle}
          styles={styles}
        />
        <button className={styles.submit}>Sign Up</button>
        <ThirdPartySignInButtons handleSignIn={handleSignUp} styles={styles} />
        <p className={styles.signIn}>
          Already signed up?{"\u00a0"}
          <Link href="/auth/signin" className={styles.signInLink}>
            Go to sign in
          </Link>
        </p>
      </form>
      <div className={styles.image}>
        <img src="/images/signUp.png" className={styles.ri} alt="signin" />
      </div>
    </div>
  );
};

export default SignupForm;
