import { getApplicants, getMembers, getScheduleData } from "api/firebaseApi";
import ScheduleHeader from "components/schedule/ScheduleHeader";
import ScheduleMain from "components/schedule/ScheduleMain";
import LoadingSpinner from "components/ui/LoadingSpinner";
import styles from './ScheduleManage.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { uiActions } from "store/ui-slice";
import MembersCard from "components/schedule/MembersCard";
import ApplicantsCard from "components/schedule/ApplicantsCard";
import { scheduleActions } from "store/schedule-slice";

const ScheduleManage = () => {
    const params = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [scheduleData, setScheduleData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [applicants, setApplicants] = useState([]);
    
    useEffect(() => {
        getScheduleData(params.scheduleId).then((res) => {
            if (res.authorId !== auth.uid) {
                dispatch(uiActions.toggleSnackbar({value:true, type:'alert',message:'로그인 정보가 옳지 않습니다.'}));
                history.push('/');
            } else {
                Promise.all([getMembers(params.scheduleId), getApplicants(params.scheduleId)]).then((memApp) => {
                    setMembers(memApp[0]);
                    setApplicants(memApp[1]);
                })
                dispatch(scheduleActions.setScheduleData(res))
                setScheduleData(res);
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            }
        })
        return () => {
            dispatch(scheduleActions.setScheduleData(null))
    }
    }, [auth,dispatch,history,params])


    return (
        <>
            {isLoading && <LoadingSpinner />}
            {!isLoading && scheduleData && <>
                <ScheduleHeader data={scheduleData} />
                {/* <ScheduleMain /> */}
                <div>지원자 목록</div>
                {applicants.map((v) => {
                    return (
                        <div key={v.id} className={styles.managepanel}>
                            <ApplicantsCard data={v} />
                        </div>
                    )
                })}
                <div>멤버 목록</div>
                {members.map((v) => {
                    return (
                        <div key={v.id} className={styles.managepanel}>
                            <MembersCard data={v} />
                        </div>

                    )
                })}
            </>}
        </>
    )

}

export default ScheduleManage