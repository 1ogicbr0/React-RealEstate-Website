import styles from './Card.module.css'

const Card = (props) => {
    console.log(props)
    if(props.classes === 'specialcard'){
    return <div className={styles.classes}>{props.children}</div>
    }
    return <div className={styles.card}>{props.children}</div>
}

export default Card;