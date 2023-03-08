import style from './LoadingSpinner.module.css'
const LoadingSpinner = ({ size, color, width }) => {

    const values = {
        size: size ? `${size*1}px` : '36px',
        color: color ? color.includes('#') ? color : `var(--${color}-color)` : '#333',
        width: width ? `${width*1}px` : '3px'
    }


    const spinnerStyles = {
        width: values.size,
        height: values.size
    }
    const circleStyles = {
        width: values.size,
        height: values.size,
        'border': values.width+' solid #f3f3f3',
        'borderTop': values.width+' solid '+values.color,
    }
    return (
        <div className={style.loading}>
            <div className={style.spinner} style={spinnerStyles}>
                <div className={style.circle} style={circleStyles}></div>
            </div>
        </div>
)}

export default LoadingSpinner