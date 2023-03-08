import styles from './Col.module.css'
const Col = (props) => {
    return <div className={styles.col} col={props.col}>{props.children}</div>
}
export default Col