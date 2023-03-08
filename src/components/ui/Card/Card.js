import styles from './Card.module.css'
const Card = (props) => {
    const onClickHandler = (e) => {
        e.stopPropagation();
        if (props.onClick) {
            props.onClick(e);
        }

    }
    return (
        <div className={`${styles.card} ${props.hover ? styles.hoverd : ''}`} style={props.style} onClick={onClickHandler}>
            {props.children}
        </div>
    )

}

export default Card