import { Button, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import styles from './ScheduleFilter.module.css'
import ScheduleDateTime from "./ScheduleFilterChild/ScheduleDateTime";
import ScheduleDungeon from "./ScheduleFilterChild/ScheduleDungeon";
import ScheduleReward from "./ScheduleFilterChild/ScheduleReward";
import ScheduleRecruit from "./ScheduleFilterChild/ScheduleRecruit";
import LoadingSpinner from "components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ScheduleFilter = () => {
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 0);
    
      return () => {
      }
    }, [])
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formatDateTime = (dateTimeString) => {
            if (dateTimeString) {
                return `${dateTimeString.split('T')[0]} ${dateTimeString.split('T')[1]}:00`;
            } else {
                return ''
            }
        }
        const queries = {
            start: formatDateTime(e.target['start-datetime'].value),
            end: formatDateTime(e.target['end-datetime'].value),
            dungeon: e.target['dungeon-select'].value,
            difficulty: e.target['difficulty-select'].value,
            reward_min: e.target['reward-min'].value,
            reward_max: e.target['reward-max'].value,
            recruit: e.target['specList'].value,
        }
        let search = `?start=${queries.start}`;
        for (const [key, value] of Object.entries(queries)) {
            if (value) {
                if (key === 'recruit') {
                    value.split(',').forEach((elem) => {
                        search += `&recruit[]=${elem}`
                    });
                } else if(key ==='start') {
                } else {
                    search += `&${key}=${value}`;
                }
            } 
        }
        navigate({
            pathname: '/worldofwarcraft/schedule',
            search: search
        });
    }
    return (<>
        {!pageLoading ? <form onSubmit={submitHandler}>
                <div sx={{ marginTop: '55px' }}>
                    <Divider style={{padding:'20px'}} />
                    <div className={'subTitle'}>일정</div>
                    <ScheduleDateTime/>
                    <Divider style={{padding:'20px'}} />
                    <div className={'subTitle'}>인스턴스</div>
                    <ScheduleDungeon/>
                    <Divider style={{padding:'20px'}} />
                    <div className={'subTitle'}>보상</div>
                    <ScheduleReward/>
                    <Divider style={{padding:'20px'}} />
                    <div className={'subTitle'}>클래스</div>
                    <ScheduleRecruit />
                </div>
            <div className={styles.buttonContainer}>
                    <Button type='submit' size="large" variant="contained" color='info'>검색</Button>
                </div>
        </form> : <LoadingSpinner color='primary' />}
    </>)

}

export default ScheduleFilter