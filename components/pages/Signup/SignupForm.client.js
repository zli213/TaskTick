"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/scss/form.module.scss";
import Icon from "../../application/widgets/Icon";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

const SignupForm = () => {
  const [formData, setFormData] = useState({});
  const { data: session, status } = useSession();
  // const [message, setMessage] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpInitiated, setSignUpInitiated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const userData = session
          ? {
              name: session.user?.name,
              email: session.user?.email,
              role: session.user?.role,
              avatar_url: session.user?.avatar_url,
            }
          : status;
        try {
          console.log("User Information:", session?.user);

          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userData }),
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
            const responseData = await response.json();
          }
        } catch (error) {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    };

    fetchData(); // Call the async function
  }, [status, session, signUpInitiated]);

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
        // Handle error responses
        console.error("Error response:", await response.json());
      } else {
        // Handle successful response
        console.log("Successful response:", await response.json());
      }
    } catch (error) {
      // Handle fetch error
      console.error("Fetch error:", error);
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
  const handleSignUp = async (provider) => {
    signIn(provider, {
      redirect: false,
      // callbackUrl: "/auth/signin",
    });
    setSignUpInitiated(true);
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
      <div className={styles.dividerWithText}>
        <span>OR</span>
      </div>
      <div className={styles.google}>
        <a
          className={styles.google}
          style={{ backgroundColor: "#55acee" }}
          onClick={() => handleSignUp("google")}
          role="button"
        >
          <Icon type="google" className={styles.icon} />
          Continue with Google
        </a>
      </div>
      <div className={styles.github}>
        <a
          className={styles.github}
          style={{ backgroundColor: "#55acee" }}
          onClick={() => handleSignUp("github")}
          role="button"
        >
          <Icon type="github" className={styles.icon} />
          Continue with GitHub
        </a>
      </div>
      <p className={styles.signIn}>
        Already signed up?{" "}
        <Link href="/auth/signin" className={styles.signInLink}>
          Go to sign in
        </Link>
      </p>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      // 显示status
      <pre>{JSON.stringify(status)}</pre>
      <pre>{JSON.stringify(formData)}</pre>
    </form>
  );
};

export default SignupForm;
