import styles from './Row.module.css'

const Row = (props) => {
    return <div className={styles.row} col={ props.col }>{props.children}</div>

}
export default Row