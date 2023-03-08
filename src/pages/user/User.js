import { NavLink, Route, Navigate, Routes } from 'react-router-dom';
import styles from './User.module.css'
import UserCharacter from '../../components/user/UserCharacter';
import UserMain from '../../components/user/UserMain';
import UserSchedule from '../../components/user/UserSchedule';
import UserCharacterSync from 'components/user/UserCharacterSync';
import { useEffect, useState } from 'react';
import { getMypageData } from 'api/partyApi';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/auth-slice';
import { getCharacter } from 'api/blizzardApi';
import Icon from '@mdi/react';
import { mdiViewDashboard,mdiCalendar, mdiGamepadSquare, mdiLogout, mdiAccount  } from '@mdi/js';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import UserProfile from 'components/user/UserProfile';

const User = () => {
    const [myPageData, setMyPageData] = useState();
    const [loadingState, SetLoadingState] = useState(true);
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(authActions.logout());
    }
    useEffect(() => {
        SetLoadingState(false);
        // getMypageData().then((res) => {
        //     setMyPageData(res.data);
        // });
    },[])
    return (
        <div className={styles.container}>
            <section className={ styles.navigation }>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} to={`/user/main`}>
                    <div className={styles.navTitle}>
                        <Icon size={1.1} path={mdiViewDashboard} />
                        Dashboard
                    </div>
                    
                 </NavLink>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} to={`/user/character`}>
                    <div className={styles.navTitle}>
                        <Icon size={1.1} path={mdiGamepadSquare} />
                        Characters

                    </div>
                    
                     </NavLink>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} to={`/user/schedule`}>
                    <div className={styles.navTitle}>
                        <Icon size={1.1} path={mdiCalendar} />
                        Schedule
                    </div>
                    
                </NavLink>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} to={`/user/profile`}>
                    <div className={styles.navTitle}>
                        <Icon size={1.1} path={mdiAccount} />
                        Profile
                    </div>
                    
                </NavLink>
                <div className={styles.navTitle} style={{ color: 'red' }}
                    onClick={logOutHandler}
                >
                    <Icon size={1.1} path={mdiLogout} />
                    LogOut
                </div>
            </section>
            <section className={ styles.main }>
                {!loadingState && <Routes>
                    <Route path='main' element={<UserMain data={myPageData} />} />
                    <Route path='character/sync' element={<UserCharacterSync />} />
                    <Route path='character' element={<UserCharacter data={myPageData} />} />
                    <Route path='schedule' element={<UserSchedule />} />
                    <Route path='profile' element={<UserProfile />} />
                    <Route path='*' element={<Navigate replace to='/user/main' />} />
                </Routes>}
                {loadingState && <LoadingSpinner />}
            </section>
        </div>
    )
}

export default User;