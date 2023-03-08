import CharacterCard from "components/character/CharacterCard"
import styles from './InvolvedCharacterCard.module.css'



const InvolvedCharacterCard = ({ data }) => {
    const typeStatusData = {
        '1': {
            'color': 'var(--success-color)',
            'text':'수락'
        },
        '-1': {
            'color': 'var(--alert-color)',
            'text': '거절',
        },
        '0': {
            'color': 'var(--warning-color)',
            'text': '미확인',
        },
        'leader': {
            'color': 'var(--primary-color)',
            'text': '파티장',
        },
        'applicant': {
            'color': 'var(--warning-color)',
            'text': '지원자',
        },
        'member': {
            'color': 'var(--success-color)',
            'text': '파티원',
        }
    }

    return (
        <div className={styles.involvedchar}>
            <div className={styles.details}>
                <div className={styles.chip} style={{background:typeStatusData[data.grade].color}}>{typeStatusData[data.grade].text}</div>
                <div className={styles.chip} style={{background:typeStatusData[data.status].color}}>{typeStatusData[data.status].text}</div>
            </div>
            <CharacterCard data={data}/>
        </div>
    )
}
export default InvolvedCharacterCard