// app/auth/signin/page.js
"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../styles/scss/form.module.scss";
import Link from "next/link";
import Navbar from "../../../components/pages/Navbar";
import { useSession } from "next-auth/react";
import ThirdPartySignInButtons from "../../../components/pages/Signin/ThirdPartySignInButtons";
import EmailInputField from "../../../components/pages/Signin/EmailInputField";
import PasswordInputField from "../../../components/pages/Signin/PasswordInputField";

const SignInPage = () => {
  const { data: session } = useSession();
  const [signUpInitiated, setSignUpInitiated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleVisibilityToggle = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });
      setLoading(false);
      if (!res?.error) {
        router.push("/application/today");
      } else {
        setError("invalid email or password.");
      }
    } catch (error) {
      setLoading(false);
      setError("invalid email or password:" + error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const showNotification = (message) => {
    setNotification(message);
    // hide notification after 30 seconds
    setTimeout(() => {
      setNotification(null);
    }, 30000);
  };

  const handleSignIn = async (provider) => {
    await signIn(provider, {
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
        // set 3 seconds timeout to allow the sign out process to complete
        setTimeout(() => {
          signOut();
        }, 2000);
      } else {
        showNotification(accountStatus);
      }
    };
    fetchData();
  }, [session, signUpInitiated]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          {notification && (
            <div style={{ color: "red", margin: "10px 0" }}>{notification}</div>
          )}
          {error && <p className={styles.error}>{error}</p>}

          <EmailInputField
            formValues={formValues}
            handleChange={handleChange}
            styles={styles}
          />

          <PasswordInputField
            formValues={formValues}
            handleChange={handleChange}
            isPasswordVisible={isPasswordVisible}
            handleVisibilityToggle={handleVisibilityToggle}
            styles={styles}
          />
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "loading..." : "Sign In"}
          </button>

          <ThirdPartySignInButtons
            handleSignIn={handleSignIn}
            styles={styles}
          />
          <p className={styles.signUp}>
            Don't have an account?{"\u00a0"}
            <Link href="/auth/register" className={styles.signUpLink}>
              Sign up
            </Link>
          </p>
        </form>
        <div className={styles.image}>
          <img src="/images/signIn.jpg" className={styles.ri} alt="signin" />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
