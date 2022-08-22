import styles from "./SinglePropertyDisplay.module.css";
import EmailForm from "../Email/EmailForm";
const SinglePropertyItem = (props) => {
  const sumitEmailForm = (userData) => {
    props.emailPopUP(true);
    console.log(userData)
  }
  console.log("PROPS", props);
  return (
    <section>
      <div className={styles.back}>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src={props.img} alt={props.title} />
            <div className={styles.info}>
            <h2>{props.title}</h2>
            <div className={styles.desc}>
              <span>Price: {props.price} Rs</span>
              <span>Size: {props.size} Marlas</span>
              <span>Description: {props.description}</span>
              <span>Address: {props.address}</span>
            </div>
            </div>
          </div>
          <div className={styles.emailForm}><EmailForm onSubmit={sumitEmailForm} /></div>
        </div>
      </div>
    </section>
  );
};

export default SinglePropertyItem;
