import styles from './RecruitItem.module.css'

const RecruitItem = ({id, imgUrl, spec, color }) => {
    return (
        <div className={styles.container}>
            <div style={{ color: color }} className={styles.chip}>
                {id.includes('all') ? <><div>모든</div> <div>{ spec }</div></> : <><div>{spec.slice(0,2)}</div>
                <div>{spec.slice(2)}</div></>}
            </div>
            <img className={styles.avatar} src={imgUrl} alt="recruit_spce" />
        </div>
    )

}

export default RecruitItem