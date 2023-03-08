import styles from './Button.module.css'
import LoadingSpinner from './LoadingSpinner'
const Button = ({ disabled, onClick, loading, children, block, color, textColor, type, outlined }) => {
    const backgroundColor = color && color.includes('#') ? color : `var(--${color}-color)`;
    const buttonStyles = {
        color: textColor ? textColor.includes('#') ? textColor : `var(--${textColor}-color)` : 'white',
        width: block ? '100%' : '',
        backgroundColor: color && (disabled ? 'gray' : backgroundColor),
        border: outlined ? `1px solid ${backgroundColor}` : 'none',
    }
    if (outlined) {
        buttonStyles.backgroundColor = 'transparent';
    }
    return (
        <button 
            type={type ? type : 'button'}
            onClick={onClick} 
            className={styles.button} 
            style={buttonStyles}
            disabled={disabled} 
        >
            {loading ? <LoadingSpinner color="alert" width="3" size="24" /> : children}
        </button>
    )
}
export default Button
