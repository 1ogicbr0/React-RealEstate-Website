import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import useInput from "../../hooks/use-inputs";
import useAuth from "../../hooks/use-Auth";
import RotateLoader from "react-spinners/RotateLoader";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import ErrorCard from "../UI/ErrorShowCard";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useHistory();
  const { sendLoginRequest, isLoading, hasError } = useAuth();
  console.log("redirect", authCtx.isRedirected);
  const {
    value: enteredEmail,
    valueIsValid: enterEmailIsValid,
    hasError: emailInputIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    hasError: passwordInputIsInvalid,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");

  //Form Validation
  let submitFormValid = false;
  if (enterEmailIsValid && enteredPasswordIsValid) {
    submitFormValid = true;
  }
  ////

  const submitHandler = (event) => {
    event.preventDefault();

    if (submitFormValid) {
      const req = sendLoginRequest({ email: enteredEmail, password: enteredPassword });
      if(!hasError) {
      authCtx.redirection('LoginRedirect')
      }
    }
    resetEmail();
    resetPassword();

  };

  const emailInputClasses = emailInputIsInvalid ? `${styles.invalid}` : "";
  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.invalid}`
    : "";
  const formInputClasses = !submitFormValid
    ? `${styles.submit} ${styles.formInvalid}`
    : `${styles.submit}`;
    console.log("Error",hasError)
  if (isLoading) {
    return (
      <div style={{ margin: "5rem" }} className={styles.Loading}>
        <RotateLoader color="white" />
      </div>
    );
  }
  if(hasError) {
    <ErrorCard onClose={() => {authCtx.redirection(false)}} title="Wrong Credentials" message="Please try again" />
  }


  return (
    <React.Fragment>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.title}>Login Portal</div>
        <div className={styles.subtitle}>Enter your credentials</div>
        {authCtx.isRedirected === 'EmailRedirect'&& (
          <div className={styles.emailRedirectedText}><span>Please Sign In First</span></div>
        )}
        <div className={styles.box}>
          <div className={emailInputClasses}>
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="email"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && <p>Enter Valid Email</p>}
          </div>
          <div className={passwordInputClasses}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {passwordInputIsInvalid && <p>Enter Valid Password</p>}
          </div>

          <button disabled={!submitFormValid} className={formInputClasses}>
            Login
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
