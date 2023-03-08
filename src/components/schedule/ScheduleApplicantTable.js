import ScheduleApplicantItem from './ScheduleApplicantItem';
import styles from './ScheduleApplicantTable.module.css'
const ScheduleApplicantTable = ({ members, color, title }) => {
    return (
        <>
            <div className={styles.title}>{title}</div>
            <table>
                <thead>
                    <tr style={{backgroundColor: `${color}`}}>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Comments</th>
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
                                return <ScheduleApplicantItem key={`${v.id}-${idx}`} data={v} />
                        })
                    }</> :
                    <tr>
                        <td colSpan={12} style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '700', padding: '16px' }}>No data</td>
                    </tr>}
        
                </tbody>
            </table>
        </>
    )
}
export default ScheduleApplicantTable