import styles from './InputDateTime.module.css'

// switch with 

const currentTime = new Date(Date.now() - new Date().getTimezoneOffset()*60000).toISOString().split('T')[0];
const validateDateTime = (dateTimeState) => {
    if (dateTimeState.start_date === '') {
        return {isValid: false, errorMessage: "시작 날짜를 입력하세요!"}
    } else if (dateTimeState.start_time === '') {
        return {isValid: false, errorMessage: "시작 시간을 입력하세요!"}
    } else if (dateTimeState.end_date === '') {
        return {isValid: false, errorMessage: "종료 날짜를 입력하세요!"}
    } else if (dateTimeState.end_time === '') {
        return {isValid: false, errorMessage: "종료 시간을 입력하세요!"}
    } else {
        const start = new Date(dateTimeState.start_date + 'T' + dateTimeState.start_time);
        const end = new Date(dateTimeState.end_date + 'T' + dateTimeState.end_time);
        if (start.getTime() < new Date().getTime()) {
            return {isValid: false, errorMessage: "시작 일정이 너무 이릅니다."}
        }
        const isValid = start.getTime() < end.getTime();
        return isValid ? {
            isValid: isValid,
            errorMessage: ""
        } : {isValid: isValid, errorMessage:"종료 일정이 시작 일정보다 빠릅니다."}
    }
}
const InputDateTime = (props) => {
    console.log('inpute -date time');

    const changeStartDateHandler = (e) => {
        props.onChange({
            ...props.dateTime,
            start_date: e.target.value,
            ...validateDateTime({ ...props.dateTime, start_date: e.target.value })
        });
    }
    const changeStartTimeHandler = (e) => {
        props.onChange({
            ...props.dateTime,
            start_time: e.target.value,
            ...validateDateTime({ ...props.dateTime, start_time: e.target.value })
        });
    }
    const changeEndDateHandler = (e) => {
        props.onChange({
            ...props.dateTime,
            end_date: e.target.value,
            ...validateDateTime({ ...props.dateTime, end_date: e.target.value })
        });
    }
    const changeEndTimeHandler = (e) => {
        props.onChange({
            ...props.dateTime,
            end_time: e.target.value,
            ...validateDateTime({ ...props.dateTime, end_time: e.target.value })
        });
    }
   
    return (
        <>
            <div className={styles.time_container}>
                <div className={styles.time} style={{width:'50%'}}>
                    <div style={{textAlign:'center'}}>일정 시작</div>
                    <input
                        id="date_start"
                        data-placeholder="시작 날짜"
                        min={currentTime}
                        required
                        type="date"
                        defaultValue=''
                        onChange={changeStartDateHandler} />
                    <input
                        id="time_start"
                        data-placeholder="시작 시간"
                        required
                        defaultValue=''
                        type="time"
                        onChange={changeStartTimeHandler} />
                </div>
                <div className={styles.time} style={{width:'50%'}}>
                    <div style={{textAlign:'center'}}>일정 종료</div>
                    <input
                        id="date_end"
                        data-placeholder="종료 날짜"
                        min={currentTime}
                        required
                        defaultValue=''
                        type="date"
                        onChange={changeEndDateHandler}/>
                    <input
                        id="time_end"
                        data-placeholder="종료 시간"
                        required
                        defaultValue=''
                        type="time"
                        onChange={changeEndTimeHandler}
                    />
                </div>
            {!props.dateTime.isValid && <div className={ styles.error }>{ props.dateTime.errorMessage}</div>}
            </div>
        </>
    )
}
export default InputDateTime