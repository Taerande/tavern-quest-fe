import styles from './ScheduleMain.module.css' 

const ScheduleMain = (props) => {
    return (
        <div className={styles.container}>
            <div>내용 //추후 html 형식으로 변경</div>
            <div>
                { props.scheduleInfo.description }
            </div>
        </div>
    )
}
export default ScheduleMain