import styles from "./Slider.module.css";
const Slider = (props) => {
    const setRentTypeHandler = () => {
        props.setType('rent')
    }

    const setSaleTypeHandler = () => {
        props.setType('sale')
    }
    const setBothTypeHandler = () => {
      props.setType('')
  }

  return (
    <section className={styles.slide}>
      <div className={styles.title}>
        <span onClick={setRentTypeHandler} className={styles.rent}>RENT</span>
        <span className={styles.slash}> / </span>
        <span onClick={setSaleTypeHandler} className={styles.sale}>SALE</span>
        <div onClick={setBothTypeHandler} className={styles.small}>
          A House
      </div>
      </div>

    </section>
  );
};

export default Slider;
