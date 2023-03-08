import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react';
import styles from './ScheduleMemberTable.module.scss'
const ScheduleMemberTable = ({members, color}) => {
    const statusSet = [
        {
            id: 1,
            name: '수락',
            color: 'success'
        },
        {
            id: 0,
            name: '미확정',
            color: 'warning'
        },
        {
            id: -1,
            name: '거절',
            color: 'alert'
        }
    ];
    const setStatus = (value) => {
        return statusSet.find(v => v.id === value);
    }
    return (
        <>
            <table className={styles.memberTable}>
                <thead>
                    <tr style={{backgroundColor: `${color}`}}>
                    <th>Status</th>
                    <th>Grade</th>
                    <th>Profile</th>
                    <th style={{textAlign:'center'}}>Spec</th>
                    <th>Gear</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ?
                    <>{
                            members.map((v, idx) => { 
                            if (v.spec === undefined) {
                                return <tr key={`${idx}-undefined`}>
                                    <td colSpan='12' style={{textAlign:'center',fontSize: '1.2rem',fontWeight:'bold'}}>알 수 없는 유저</td>
                                </tr>
                            }
                            return <tr key={`${v.id}-${idx}`}>
                                <td>
                                     <Icon path={mdiCircle} color={`var(--${setStatus(v.pivot.status).color}-color)`} size={0.7} />
                                    { setStatus(v.pivot.status).name }
                                </td>
                                <td>
                                    { v.pivot.grade }
                                </td>
                                <td>
                                    <div className={styles.userInfo}>
                                        <img src={v.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                                        <div className={styles.details}>
                                            <div>{v.name}<span className='txtCaption'>@{v.realm}</span></div>
                                            <div>{v.character_class} Lv.{v.level}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.spec}>
                                        <img src={v.spec.imgUrl} className={styles.specAvatar} alt='spec_img_url' />
                                        <div style={{color:`${v.spec.color}`}} className={ styles.specName}>{ v.spec.spec}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className={ styles.gear }>
                                        <div>평균:{ v.average_item_level}</div>
                                        <div>착용:{ v.equipped_item_level}</div>
                                        <div>쐐기돌:{ Math.round(v.current_mythic_rating,0)}</div>
                                    </div>
                                </td>
                                <td>
                                    asd
                                </td>
                            </tr>
                        })
                    }</> :
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '700', padding: '16px' }}>No data</td>
                    </tr>}
        
                </tbody>
            </table>
        </>
    )
}
export default ScheduleMemberTable