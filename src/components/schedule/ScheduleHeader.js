import styles from 'components/schedule/ScheduleHeader.module.css' 
import RecruitItem from './RecruitItem';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from 'store/ui-slice';
import ApplySchedule from './ApplySchedule';
import wowDungeons from 'assets/game_data/wowDungeons.json'
import { deleteSchedule } from 'api/partyApi';
let allInstances = [];
wowDungeons.map((v) => { return allInstances = [...allInstances, ...v.instances] });
const ScheduleHeader = ({ leaderInfo, scheduleInfo }) => {
    const auth = useSelector(state => state.auth);
    const [deleteLoadingBtn, setDeleteLoadingBtn] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();

    const deleteScheduleHandler = () => {
        setDeleteLoadingBtn(true);
        if (window.confirm('정말 스케쥴을 삭제 하시겠습니까?')) {
            deleteSchedule(scheduleInfo.id).then((res) => {
                setDeleteLoadingBtn(false);
                dispatch(uiActions.toggleSnackbar({ type: 'success', value: true, message: '일정을 삭제했습니다.' }))
                history('/');
            })
        } else {
            setDeleteLoadingBtn(false);
        }
        
    }

    return (<>
        {scheduleInfo.id && <div className={styles.container}>
            <div className={styles.controllPanel}>
                {leaderInfo ?
                    <>
                        <Button loading={deleteLoadingBtn} onClick={deleteScheduleHandler}>Delete</Button>
                    </>    
                    : <ApplySchedule data={ scheduleInfo } />}
            </div>
            
                <div className={styles.title}>
                    <div>
                        <img className={styles.avatar} src={require('assets/images/wow_logo.png')} alt='wow_logo' />
                        <h1>{scheduleInfo.title}</h1>
                </div>
                {leaderInfo && <>
                    <div className={styles.author}>
                        <div className='txtTitle'>{leaderInfo.name}</div>
                        {/* <div className='caption'>@{partyInfo.name}</div> */}
                    </div>
                </>}
            </div>
            <div className={styles.detail}>
                <div>
                    <div className='txtCaption'>일정</div>
                    <div style={{ display: 'flex' }}>
                        <div>{scheduleInfo.start}</div> ~
                        <div>{scheduleInfo.end}</div>
                    </div>
                    <div className='txtCaption'>위치</div>
                    <div>{allInstances.find(el => el.id === scheduleInfo.dungeon).name}</div>
                </div>
                <div>
                    <div className='txtCaption'>목표</div>
                    <div>{scheduleInfo.goal}</div>
                    <div className='txtCaption'>난이도</div>
                    <div>{scheduleInfo.difficulty}</div>
                </div>
                <div>
                    <div className='txtCaption'>보상</div>
                    <div>{scheduleInfo.reward}</div>
                </div>
            </div>
            <div style={{padding:'16px 0px'}}>구인</div>
            <div className={styles.recruit}>
                {scheduleInfo.recruit.map((v) => { return <RecruitItem id={v.id} spec={v.spec} color={v.color} count={ 1 } imgUrl={v.imgUrl} key={v.id} /> })}
            </div>
        </div>}
        </>
    )

}

export default ScheduleHeader;