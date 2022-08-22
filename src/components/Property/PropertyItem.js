import Card from '../UI/Card'
import styles from './PropertyItem.module.css';
import { Link } from 'react-router-dom'
import {useState} from 'react'

const PropertyItem = (props) => {

  const [flip, setFlip] = useState(false);
  const flipToggleHandler =() => {
    setFlip(!flip);
    console.log(flip)
  }
  console.log(props)
  const frontCard =`${styles.front}`
  const backCard = `${styles.back}`
  const cardClass = !flip ? `${styles.specialcard}`: `${styles.specialcard} ${styles.flip}`


  return (
    <div className={cardClass} onClick={flipToggleHandler} >
      <div className={frontCard} >
        <img src={props.img} alt={props.title} />
      </div>
      <div className={backCard} >
        <h1 className={styles.animateBorder}><Link to={`/properties/${props.id}`}>{props.title.toUpperCase()}</Link></h1>
        <div>Price: {props.price} Rs</div>
        <div>Size: {props.size} Marlas</div>
        <div>Type: {props.type}</div>
      </div>
    </div>
  );
};

export default PropertyItem;
