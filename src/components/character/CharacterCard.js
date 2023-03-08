import styles from './CharacterCard.module.css'
const CharacterCard = ({data, onClick, selected}) => {
    return (
        <div className={`${styles.container} ${selected ? styles.isSelected : ''}`} onClick={onClick}>
            <div className={styles.userInfo}>
                <img src={data.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                <div className={styles.details}>
                    <div>{data.name}<span className='txtCaption'>@{data.realm}</span></div>
                    <div>{data.character_class} Lv.{data.level}</div>
                </div>
            </div>
            <div className={ styles.sepc}>
                <div>평균:{ data.average_item_level}</div>
                <div>착용:{ data.equipped_item_level}</div>
                <div>쐐기돌:{ Math.round(data.current_mythic_rating,0)}</div>
            </div>
        </div>
    )


}

export default CharacterCard;