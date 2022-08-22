import styles from "./NewPropertyForm.module.css";
import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-inputs";
import useHttp from "../../hooks/use-Http";
import FadeLoader from "react-spinners/FadeLoader";

const NewPropertyForm = () => {

  const navigate = useHistory();
  const [type, setType] = useState(null);
  const [rentbuttonIsActive, setRentbuttonIsActive] = useState(false)
  const [salebuttonIsActive, setSalebuttonIsActive] = useState(false)
  let formIsValid = false;
  /////Input Validation
  const {
    value: enteredTitle,
    valueIsValid: enterdTitleIsValid,
    hasError: titleInputIsInvalid,
    inputChangeHandler: titleInputChangeHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    valueIsValid: enterdAddressIsValid,
    hasError: addressInputIsInvalid,
    inputChangeHandler: addressInputChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: resetAddress,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    valueIsValid: enterdDescriptionIsValid,
    hasError: descriptionInputIsInvalid,
    inputChangeHandler: descriptionInputChangeHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredSize,
    valueIsValid: enterdSizeIsValid,
    hasError: sizeInputIsInvalid,
    inputChangeHandler: sizeInputChangeHandler,
    inputBlurHandler: sizeInputBlurHandler,
    reset: resetSize,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    valueIsValid: enterdPriceIsValid,
    hasError: priceInputIsInvalid,
    inputChangeHandler: priceInputChangeHandler,
    inputBlurHandler: priceInputBlurHandler,
    reset: resetPrice,
  } = useInput((value) => value.trim() !== "" && value > 0);

  const {
    value: enteredImgURL,
    valueIsValid: enterdImgIsValid,
    hasError: imageInputIsInvalid,
    inputChangeHandler: imageInputChangeHandler,
    inputBlurHandler: imageInputBlurHandler,
    reset: resetImage,
  } = useInput((value) => value.trim() !== "");
  //// Validation  Input Ended

  //Valid Form check


    if (
      enterdTitleIsValid &&
      enterdAddressIsValid &&
      enterdDescriptionIsValid &&
      enterdSizeIsValid &&
      enterdPriceIsValid &&
      enterdImgIsValid && 
      type
    ) {
      formIsValid =true;
    }else {
      formIsValid =false;
    }


  //Type Change Hangler
  const rentChangeTypeHandler = () => {
    setRentbuttonIsActive(true);
    setSalebuttonIsActive(false);
    setType("rent");
    console.log("Rent",rentbuttonIsActive)
  };
  const saleChangeTypeHandler = () => {
    setRentbuttonIsActive(false);
    setSalebuttonIsActive(true);
    setType("sale");
    console.log("Sale",salebuttonIsActive)

  };

  const {isLoading, hasError:httpError, sendRequest,setIsLoading,setHttpError} = useHttp({url:'https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json',method:'POST'})

  //submit Handler
  const submitHandler = (event) => {
    event.preventDefault();
    //If form Valid
    if (formIsValid) {
      const NewProperty = {
        img: enteredImgURL,
        title: enteredTitle,
        address: enteredAddress,
        price: enteredPrice,
        description: enteredDescription,
        size: enteredSize,
        type: type,
      };
      console.log("TYPE", type);
      const res = sendRequest(NewProperty).catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });;
      console.log("Sended",res)
      // fetch('https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json',{
      //   method:'POST',
      //   body: JSON.stringify(NewProperty)
      // })
      // propertyList.onAddProperty(NewProperty);
      navigate.push("/properties");
    }

    //Resseting ALL
    resetTitle();
    resetAddress();
    resetDescription();
    resetSize();
    resetPrice();
    resetImage();
  };
  
  const  renttypeButtonClasses = rentbuttonIsActive ? `${styles.activeTypeButton}` : ''
  console.log("Class RENT", renttypeButtonClasses)
  const  saletypeButtonClasses = salebuttonIsActive ? `${styles.activeTypeButton}` : ''
  const titleInputClasses = titleInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const addressInputClasses = addressInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const descriptionInputClasses = descriptionInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const sizeInputClasses = sizeInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const priceInputClasses = priceInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const imageInputClasses = imageInputIsInvalid
    ? `${styles.box} ${styles.invalid}`
    : `${styles.box}`;
  const buttonClasses = !formIsValid
    ? `${styles.submit} ${styles.disabled}`
    : `${styles.submit}`;


  if(isLoading) {
    return <div style={{margin:'5rem'}} className={styles.Loading}><FadeLoader  height={22} color="white" margin={10} speedMultiplier={2}/></div>
  }  

  if(httpError){
    return <div>{httpError.message}</div>
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.title}>Welcome</div>
      <div className={styles.subtitle}>Add your property here!</div>
      <div className={styles.type}>
        <span  className={renttypeButtonClasses} onClick={rentChangeTypeHandler} >
          Rent
        </span>
        <span  className={saletypeButtonClasses} onClick={saleChangeTypeHandler} >
          Sale
        </span>
      </div>
      <div className={titleInputClasses}>
        <label htmlFor="title">Title </label>
        <input
          id="title"
          type="text"
          onChange={titleInputChangeHandler}
          onBlur={titleInputBlurHandler}
        />
        {titleInputIsInvalid && <p>Enter Valid Title</p>}
      </div>
      <div className={priceInputClasses}>
        <label>Price</label>
        <input
          type="number"
          onChange={priceInputChangeHandler}
          onBlur={priceInputBlurHandler}
        />
        {priceInputIsInvalid && <p>Enter Valid Price</p>}
      </div>
      <div className={imageInputClasses}>
        <label htmlFor="image">Image url </label>
        <input
          id="image"
          type="text"
          onChange={imageInputChangeHandler}
          onBlur={imageInputBlurHandler}
        />
        {imageInputIsInvalid && <p>Add image url</p>}
      </div>
      <div className={descriptionInputClasses}>
        <label htmlFor="description">Description </label>
        <input
          id="description"
          type="text"
          onChange={descriptionInputChangeHandler}
          onBlur={descriptionInputBlurHandler}
        />
        {descriptionInputIsInvalid && <p>Enter Valid Description</p>}
      </div>
      <div className={sizeInputClasses}>
        <label htmlFor="size">Add Size </label>
        <input
          id="size"
          type="text"
          onChange={sizeInputChangeHandler}
          onBlur={sizeInputBlurHandler}
        />
        {sizeInputIsInvalid && <p>Enter Valid Size</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Add Address </label>
        <input
          id="address"
          type="text"
          onChange={addressInputChangeHandler}
          onBlur={addressInputBlurHandler}
        />
        {addressInputIsInvalid && <p>Enter Valid Address</p>}
      </div>
      <button disabled={!formIsValid}className={buttonClasses}>
        Add
      </button>
    </form>
  );
};

export default NewPropertyForm;
