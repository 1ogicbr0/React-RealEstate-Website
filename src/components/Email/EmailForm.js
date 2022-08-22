import styles from './EmailForm.module.css';
import { useRef, useContext } from 'react';
import useInput from '../../hooks/use-inputs';
import AuthContext from '../../store/auth-context';
import { useHistory } from "react-router-dom";

const EmailForm =(props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useHistory();

    let formIsValid = false;
    const {
        value: enteredEmail,
        valueIsValid: enterdEmailIsValid,
        hasError: emailInputIsInvalid,
        inputChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmail,
      } = useInput((value) => value.includes('@')  );

      const {
        value: enteredPhoneNumber,
        valueIsValid: enterdPhoneNumberIsValid,
        hasError: phoneNumberInputIsInvalid,
        inputChangeHandler: phoneNumberInputChangeHandler,
        inputBlurHandler: phoneNumberInputBlurHandler,
        reset: resetPhoneNumber,
      } = useInput((value) => value.replace(/[^0-9]/g,"") !== ""  );

      const {
        value: enteredName,
        valueIsValid: enterdNameIsValid,
        hasError: nameInputIsInvalid,
        inputChangeHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetName,
      } = useInput((value) =>  value.trim() !== "");

    if(enterdEmailIsValid && enterdNameIsValid && enterdPhoneNumberIsValid) {
        formIsValid = true;
    }
    const emailSubmitFormHandler = (event) => {
        event.preventDefault();
        if(formIsValid){
            if(!authCtx.isLoggedIn)
            {
                authCtx.redirection('EmailRedirect');      
                return navigate.push("/login");
            }
            const userData ={
              email:enteredEmail,
              name: enteredName,
              phone: enteredPhoneNumber
            }
            props.onSubmit(userData);

        }
        resetEmail();
        resetName();
        resetPhoneNumber();
    }

    const emailInputClasses = emailInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;

    const nameInputClasses = nameInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
    const phoneNumberInputClasses = phoneNumberInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;

    return (<form onSubmit={emailSubmitFormHandler} className={styles.form}>
        <div className={emailInputClasses}>
          <div className={styles.title}>Drop Email</div>
        <div className={nameInputClasses}>
              <label htmlFor="email">Name</label>
              <input type="text" id="email" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName}/>
            </div>
              <label htmlFor="name">Email</label>
              <input type="text" id="name" onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail}/>
            </div>
            <div className={phoneNumberInputClasses}>
              <label htmlFor="email">Mobile No.</label>
              <input type="text" id="email" onChange={phoneNumberInputChangeHandler} onBlur={phoneNumberInputBlurHandler} value={enteredPhoneNumber}/>
            </div>
            <button disabled={!formIsValid} className={styles.buy}>Submit</button>
    </form>)
}

export default EmailForm;