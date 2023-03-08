import { mdiBell, mdiLogout, mdiEmail } from '@mdi/js'
import Icon from '@mdi/react'
import { logOutLaravel } from 'api/partyApi'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authActions } from 'store/auth-slice'
import styles from './AuthMenu.module.scss'


const AuthMenu = ({ onClose, authMenuRef }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const logOutHandler = () => {
        logOutLaravel();
        dispatch(authActions.logout());
        history('/');
        onClose();
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!authMenuRef.current.contains(event.target)) {
            onClose();
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={styles.container}>
            <div className={ styles.noti }>
                <div>
                    <div>알림</div>
                    <Icon path={mdiBell} size={1} color="grey" />
                </div>
                <div>
                    <div>메세지</div>
                    <Icon path={mdiEmail} size={1} color="grey" />
                </div>
            </div>
            <hr/>
            <div className={styles.bookmark}>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} onClick={onClose} to={`/user/main`}>
                    내 정보
                </NavLink>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} onClick={onClose} to={`/user/character`}>내 캐릭터</NavLink>
                <NavLink className={(navData)=>(navData.isActive ? styles.active : '')} onClick={onClose} to={`/user/schedule`}>내 일정</NavLink>
            </div>
            <div className={ styles.logout } onClick={logOutHandler}>
                <Icon path={mdiLogout } size={1} />
                <span>로그아웃</span>
            </div>
        </div>
    )

}

export default AuthMenu