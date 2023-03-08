import TextField from '@mui/material/TextField';

const ScheduleDateTime = () => {
    const koreanTime = new Date().getTime() - new Date().getTimezoneOffset() * 60000;
    return (
        <div style={{margin:'16px 0px',display:'flex',columnGap:'20px'}}>
            <TextField
                id="start-datetime"
                label="시작 일정"
                type="datetime-local"
                defaultValue={ new Date(koreanTime).toISOString().slice(0,16)}
                sx={{ width: 250 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                id="end-datetime"
                label="종료 일정"
                type="datetime-local"
                sx={{ width: 250 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
    )
}

export default ScheduleDateTime