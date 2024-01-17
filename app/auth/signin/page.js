// app/auth/signin/page.js
"use client";

import { set } from "mongoose";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styles from "../../../styles/scss/signin.module.scss";
import Link from "next/link";
import Navbar from "../../../components/pages/Navbar";
import Icon from "../../../components/application/widgets/Icon";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
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
        setError("invalid email or password1");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("invalid email or password2");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container} id="signContainer">
        <form className={styles.form} onSubmit={onSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.input_style}>
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>
          <div className={styles.input_style}>
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "loading..." : "Sign In"}
          </button>

          <div className={styles.dividerWithText}>
            <span>OR</span>
          </div>
          <div className={styles.google}>
            <a
              className={styles.google}
              style={{ backgroundColor: "#55acee" }}
              onClick={() =>
                signIn("google", { callbackUrl: "/application/today" })
              }
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
              onClick={() =>
                signIn("github", { callbackUrl: "/application/today" })
              }
              role="button"
            >
              <Icon type="github" className={styles.icon} />
              Continue with GitHub
            </a>
          </div>
          <p className={styles.signUp}>
            If you don't have an account,plese
            <Link href="/register" className={styles.signUpLink}>
              sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
