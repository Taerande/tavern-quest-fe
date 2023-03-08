import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import styles from './ScheduleRoutes.module.css'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "store/ui-slice";
import ScheduleManage from "pages/schedule/ScheduleManage";
const ScheduleMain = React.lazy(() => import("./ScheduleMain"));
const ScheduleFilter = React.lazy(() => import("components/games/worldofwarcraft/ScheduleFilter"));
// const CreateNewSchedule = React.lazy(() => import("./CreateNewSchedule"));
const CreateNewSchedule = React.lazy(() => import("./CreateNewScheduleV2"));
const Schedule = React.lazy(() => import("pages/schedule/Schedule"));
  
const ScheduleRoutes = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const routeToRegisterPage = () => {
        if (!auth.isLogin) {
            dispatch(uiActions.toggleSnackbar({ type: 'alert', message: '로그인을 먼저 해야합니다.', value: true }));
        } else {
            history('/worldofwarcraft/schedule/register')
        }
    }
    return (
        <div className={styles.container}>
            <div className={ styles.header }>
                <Button variant="contained" color="primary" onClick={()=>{history('./search')}}>
                    조건 검색
                </Button>
                <Button variant="contained" color="primary" disabled={!auth.isLogin} onClick={routeToRegisterPage}>
                    일정 등록
                </Button>
            </div>
            <div>
                <Routes>
                    <Route path='' element={<ScheduleMain/>}/>
                    <Route path='search' element={<ScheduleFilter />}/>
                    <Route path='register' element={auth.isLogin ? <CreateNewSchedule /> : <Navigate replace to='/worldofwarcraft/schedule'/>} />
                    <Route path=':scheduleId' element={<Schedule/>}/>
                    <Route path=':scheduleId/manage' element={<ScheduleManage/>}/>
                    <Route path='*' element={<Navigate replace to='/worldofwarcraft/schedule'/>}/>
                </Routes>
            </div>
        </div >
    )
}
export default ScheduleRoutes