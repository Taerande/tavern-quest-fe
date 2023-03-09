import styles from './ScheduleQueryView.module.css'
import wowSpecs from 'assets/game_data/wowSpecs.json'
import Icon from '@mdi/react'
import Divider from '@mui/material/Divider'
import { mdiCalendarStart,mdiMapMarker, mdiAccountSearch, mdiGold } from '@mdi/js'

const ScheduleQueryView = ({ queries, instanceDB }) => {
    const getFullDayName = (dateStr) => {
        const date = new Date(`${dateStr}`);
        const options = { weekday: 'long' };
        return date.toLocaleDateString('ko-KR', options).slice(0,1);
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                조건 |
            </div>
            <div className={styles.main}>
                <div className={ styles.dateTime }>
                    <Icon size={1} path={mdiCalendarStart} color='red' />일정 :  {queries.start &&
                        <div>
                            {queries.start.slice(0, -3)}
                            <span style={{ color: 'red' }}>({ getFullDayName(queries.start)})</span>
                        </div>}
                    {(queries.start || queries.end) && <div>~</div>}
                    {queries.end && <div>
                        {queries.end.slice(0, -3)}
                        <span style={{ color: 'red' }}>({ getFullDayName(queries.end)})</span>
                    </div>}
                </div>
                {queries.dungeon && <div className={styles.instacne}>
                    <>
                        <Icon size={1} path={mdiMapMarker} color='red' />인스턴스 :
                        {instanceDB.find(v => v.id === queries.dungeon).name}
                        {queries.difficulty && `(${queries.difficulty.toUpperCase().slice(0, 1)})`}
                    </>
                </div>}
                {(queries.reward_min || queries.reward_max) &&
                    <div className={styles.reward}>
                        <>
                            <Icon size={1} path={mdiGold} color='red' />보상 : 
                            {queries.reward_min &&
                                <div>
                                    {queries.reward_min}
                                </div>}
                            <div>~</div>
                            {queries.reward_max && <div>
                                {queries.reward_max}
                            </div>}
                        </>
                </div>}
                {queries.recruit && 
                    <div className={styles.recruit}>
                            <>
                                <Icon size={1} path={mdiAccountSearch} color='red' />클래스 : 
                                {queries.recruit.map((v) => {
                                    const specData = wowSpecs.find(val => val.id === v);
                                    return <div key={v} className={styles.avatarContainer}>
                                        <img src={specData.imgUrl} className={styles.avatar} alt='recruit_spec_img' />
                                        <div style={{
                                            color: specData.color,
                                            padding: '2px 6px',
                                            fontSize:'12px',
                                            backgroundColor: 'black',
                                            borderRadius: '8px'
                                        }}>
                                            {specData.spec}
                                        </div>
                                    </div>
                                })}
                            </>
                    </div>
                }
            </div>
            <Divider/>
        </div>
    )

}
export default ScheduleQueryView