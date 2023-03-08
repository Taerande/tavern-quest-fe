import stlyes from './CardAction.module.css'

const CardAction = (props) => {
    return (<div className={stlyes.cardAction}>{ props.children}</div>)

}


export default CardAction