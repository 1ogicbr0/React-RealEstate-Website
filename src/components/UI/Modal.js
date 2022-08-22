import ReactDOM from 'react-dom';
import { Fragment, useState } from 'react'
import styles from './Modal.module.css';

const Backdrop = props => {
    return <div onClick={props.onClose}className={styles.backdrop} />
}

const ModalOverlay = (props) => {
    let classStyle = `${styles.modal}`
    if(props.style === 'fail') {
        classStyle = `${styles.fail}` 
    }
    return <div className={classStyle}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement )}
        {ReactDOM.createPortal(<ModalOverlay style={props.style}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>

}


export default Modal;