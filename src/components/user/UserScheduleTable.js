import UserScheduleTableItem from 'components/user/UserScheduleTableItem'
import styles from './UserScheduleTable.module.scss'

const UserScheduleTable = ({ schedules, color, disabled }) => {
    return (
        <>
            <table className={styles.scheduleTable}>
                <thead>
                    <tr style={{backgroundColor: `${color}`}}>
                    <th>Status</th>
                    <th>Grade</th>
                    <th>Profile</th>
                    <th>Date Time</th>
                    <th>Instance</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.length > 0 ?
                    <>{
                        schedules.map((v, idx) => { 
                            return <UserScheduleTableItem key={`${v.id}-${idx}`} data={v} disabled={ disabled ? disabled : false } />
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

export default UserScheduleTable