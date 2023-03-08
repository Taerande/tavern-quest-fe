import styles from './CardContent.module.css'
const CardContent = (props) => {
    return (<div style={props.style} className={styles.cardContent}>{ props.children}</div>)

}

export default CardContent