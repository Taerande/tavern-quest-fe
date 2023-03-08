import styles from './SelectorItem.module.css'
const SelectorItem = ({ children, style }) => {
    return(
        <div className={ styles.li } style={style}>
            {children}
        </div>
    )
}

export default SelectorItem