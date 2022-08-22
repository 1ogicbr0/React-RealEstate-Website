import styles from './ErrorShowCard.module.css';
import Modal from './Modal'

const ErrorCard = (props) => {

    return (<Modal onClose={props.onClose} style="fail">
        <div className={styles.message}>{props.title}</div>
        <div className={styles.emailDetail}>{props.message}</div>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onClose}>Close</button>
        </div>
    </Modal>)
}

export default ErrorCard;