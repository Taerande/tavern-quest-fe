import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ScheduleHeader from "../../components/schedule/ScheduleHeader";
import ScheduleMain from "../../components/schedule/ScheduleMain";
import wowSpecs from 'assets/game_data/wowSpecs.json'
import styles from './Schedule.module.css'
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "store/schedule-slice";
import { getScheduleData,getScheduleApplicants } from "api/partyApi";
import { Divider } from "@mui/material";
import { getCharacter } from "api/blizzardApi";
import ScheduleMemberTable from "components/schedule/ScheduleMemberTable";
import ScheduleApplicantTable from "components/schedule/ScheduleApplicantTable";
import { uiActions } from "store/ui-slice";
const Schedule = () => {
    const params = useParams();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [scheduleData, setScheduleData] = useState();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLeader, setIsLeader] = useState(false);
    useEffect(() => {
        getScheduleData(params.scheduleId).then(async (res) => {
            await Promise.all(res.members.map(v => getCharacter(v.name.split('-')[1], v.name.toLowerCase().split('-')[0]))).then((resp) => {
                resp.forEach((respItem, idx) => {
                    if (respItem) {
                        res.members[idx] = {
                            ...res.members[idx],
                            ...respItem,
                            spec: wowSpecs.find(val => val.spec === `${respItem.active_spec} ${respItem.character_class.replace(/\s+/g, "")}`),
                        };
                    };
                })
            });
            res.scheduleInfo.recruit = res.scheduleInfo.recruit.map((v) => {
                return wowSpecs.find(val => val.id === v);
            });
            if (auth) {
                const myChar = res.members.find(v => v.user_id === auth.uid);
                if (!myChar) {
                        setIsLoading(false);
                        setScheduleData(res);
                        dispatch(scheduleActions.setScheduleData(res))
                    return
                }
                if (res.members.find(v => v.user_id === auth.uid).pivot.grade === 'leader') {
                    getScheduleApplicants(params.scheduleId).then(async (res) => {
                        await Promise.all(res.applicants.map(v => getCharacter(v.name.split('-')[1], v.name.toLowerCase().split('-')[0])))
                            .then((resp) => {
                                resp.forEach((respItem, idx) => {
                                    if (respItem) {
                                        res.applicants[idx] = {
                                            ...res.applicants[idx],
                                            ...respItem,
                                            spec: wowSpecs.find(val => val.spec === `${respItem.active_spec} ${respItem.character_class.replace(/\s+/g, "")}`),
                                        };
                                    };
                                })
                            });
                        setApplicants([...res.applicants]);
                    });
                    setIsLeader(true);
                }
            }
            setIsLoading(false);
            setScheduleData(res);
            dispatch(scheduleActions.setScheduleData(res))
        }).catch(() => {
            navigate('/');
            dispatch(uiActions.toggleSnackbar({ type: 'alert', message: '찾을 수 없습니다.', value: true }));
        });
        return () => {
            dispatch(scheduleActions.setScheduleData(null))
        }
    }, [params.scheduleId, auth, dispatch])
    return (
        <div className={ styles.container}>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && scheduleData && <>
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>일정 및 정보</div>
                <ScheduleHeader partyInfo={scheduleData.partyInfo} scheduleInfo={scheduleData.scheduleInfo} />
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>내용</div>
                <ScheduleMain scheduleInfo={scheduleData.scheduleInfo} />
                <Divider style={{padding:'20px'}} />
                <div className={'subTitle'}>멤버</div>
                <ScheduleMemberTable members={scheduleData.members} color='var(--primary-color)'/>
                {isLeader &&
                    <>
                        <Divider style={{padding:'20px'}} />
                        <div className={'subTitle'}>지원자</div>
                        <ScheduleApplicantTable members={applicants} color='var(--warning-color)'/>
                    
                    </>}
            </>}
            {!isLoading && !scheduleData && <p>No data</p>}
        </div>
    )

}

export default Schedule