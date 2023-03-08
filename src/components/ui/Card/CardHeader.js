import stlyes from './CardHeader.module.css'

const CardHeader = ({ color, textColor, children }) => {
    const cardHeaderStyle = {
        color: textColor ? textColor.includes('#') ? textColor : `var(--${textColor}-color)` : 'none',
        backgroundColor: color ? color.includes('#') ? color : `var(--${color}-color)` : 'none'
    }
    return (<div style={cardHeaderStyle} className={ stlyes.cardHeader }>{ children }</div>)

}


export default CardHeader