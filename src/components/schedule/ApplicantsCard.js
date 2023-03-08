import styles from './ApplicantsCard.module.css'
import { useState } from 'react';
import Button from 'components/ui/Button';
import Icon from '@mdi/react';
import { mdiCheck, mdiHelp, mdiClose } from '@mdi/js';
import { updateStatus } from 'api/firebaseApi';
import { useSelector } from 'react-redux';
const ApplicantsCard = (props) => {
    const charData = props.data.charData;
    const uid = useSelector(state => state.auth.uid);
    const scheduleData = useSelector(state => state.schedule.scheduleData);
    const [data, setData] = useState(props.data);

    const update = (status, type) => {
        const Ids = {
            scheduleId: scheduleData.id,
            uid: uid,
            charId: data.id
        }
        updateStatus({ status: status, type: 'applicants' }, Ids, type).then(() => {
            setData({ ...data, status: status, type: type, updatedAt: new Date().toISOString() });
        });

        
    }
    return (
        <div className={ styles.container }>
            <div className={styles.charInfo}>
                <img src={charData.mediaAvatar[0].value} alt="profile_img" className={styles.avatar} />
                <div className={ styles.detail}>
                    <div>
                        {`Lv.${charData.level} ${charData.character_class}`}
                    </div>
                    <div>
                        {`${charData.name} - ${charData.realm}`}
                    </div>
                    <div>
                        {charData.guild}
                    </div>
                </div>
                <div className={ styles.gear}>
                    <div>평균:{charData.average_item_level }</div>
                    <div>착용:{charData.equipped_item_level }</div>
                    <div>쐐기돌 점수:{charData.current_mythic_rating }</div>
                </div>
            </div>
            <div>
                Message
            </div>
            <div>
                <div className={styles.statusMenu}>{data.updatedAt}</div>
                <div className={styles.statusButton}>
                    <Button
                        onClick={()=>update('approve','applicants')}
                        color='success' outlined={data.status !== 'approve'} textColor={data.status !== 'approve' ? 'success' : 'white'}>
                        <div>
                            <Icon size={1} path={mdiCheck} color={data.status !== 'approve' ? 'green' : 'white'}></Icon>
                            <div className='txtCaption'>수락</div>
                        </div>
                    </Button>
                    <Button
                        onClick={()=>update('none','applicants')}
                        color='warning' outlined={data.status !== 'none'} textColor={data.status !== 'none' ? 'warning' : 'white'}>
                        <div>
                            <Icon size={1} path={mdiHelp} color={data.status !== 'none' ? 'gold' : 'white'}></Icon>
                            <div className='txtCaption'>미확정</div>
                        </div>
                    </Button>
                    <Button
                        onClick={()=>update('reject','applicants')}
                        color='alert' outlined={data.status !== 'reject'} textColor={data.status !== 'reject' ? 'alert' : 'white'}>
                        <div>
                            <Icon size={1} path={mdiClose} color={data.status !== 'reject' ? 'red' : 'white'}></Icon>
                            <div className='txtCaption'>거절</div>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default ApplicantsCard