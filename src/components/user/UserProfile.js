import { mdiAlertCircle, mdiCamera, mdiCheck, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import Button from 'components/ui/Button';
import { useSelector } from 'react-redux'
import styles from './UserProfile.module.css'

const UserProfile = () => {
    const user = useSelector(state => state.auth);
    return <div className={styles.container}>
        <div className={styles.profileContainer}>
            <div className={ styles.avatarContainer }>
                <figure>
                    <img className={styles.avatar} src={user.photoUrl} alt="user_profile_img"/>
                </figure>
                <div className={styles.avatarOverlay}>
                    <Icon path={ mdiCamera } size={1} />
                </div>
            </div>
            <div className={styles.profileInfo}>
                <div>닉네임</div>
                <div className={styles.displayName}>{user.displayName} <Icon size={0.8} path={mdiPencil} /></div>
                <div>이메일</div>
                <div className={styles.email}> { user.email } {user.email_verified_at ? <Icon size={1} path={mdiCheck} color='var(--success-color)' /> : <Icon size={1} path={mdiAlertCircle} color='var(--warning-color)' />} </div>
            </div>
        </div>
        <div>
            정산
        </div>
        <div>
            약관
        </div>
        <div className={styles.actionContainer}>
            <Button color={'primary'}>
                회원탈퇴
              
            </Button>
        </div>
    </div>

}

export default UserProfile