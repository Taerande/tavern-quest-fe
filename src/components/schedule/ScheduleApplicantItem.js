import { mdiCircle, mdiClose, mdiMessage } from '@mdi/js';
import Icon from '@mdi/react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card/Card';
import CardAction from 'components/ui/Card/CardAction';
import CardContent from 'components/ui/Card/CardContent';
import CardHeader from 'components/ui/Card/CardHeader';
import Modal from 'components/ui/Modal/Modal';
import { useEffect, useState } from 'react';
import styles from './ScheduleApplicantItem.module.scss'
const ScheduleApplicantItem = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const statusSet = [
        {
            id: 1,
            name: '수락',
            color: 'success'
        },
        {
            id: 0,
            name: '미확정',
            color: 'warning'
        },
        {
            id: -1,
            name: '거절',
            color: 'alert'
        }
    ];
    const setStatus = (value) => {
        return statusSet.find(v => v.id === value);
    }
    return (
        <>
            <tr onClick={() => setIsModalOpen(!isModalOpen)}>
                <td>
                    <Icon path={mdiCircle} color={`var(--${setStatus(data.pivot.status).color}-color)`} size={0.7} />
                    {setStatus(data.pivot.status).name}
                </td>
                <td>
                    <div className={styles.userInfo}>
                        <img src={data.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                        <div className={styles.details}>
                            <div>{data.name}<span className='txtCaption'>@{data.realm}</span></div>
                            <div>{data.character_class} Ldata.{data.level}</div>
                        </div>
                    </div>
                </td>
                <td className={styles.comments}>
                    <Icon path={mdiMessage} color={data.pivot.apply ? 'var(--primary-color)' : 'var(--dark-color)'} size={1.5} />
                </td>
                <td>
                    <div className={styles.spec}>
                        <img src={data.spec.imgUrl} className={styles.specAvatar} alt='spec_img_url' />
                        <div style={{color:`${data.spec.color}`}} className={ styles.specName}>{ data.spec.spec}</div>
                    </div>
                </td>
                <td>
                    <div className={ styles.gear }>
                        <div>평균:{ data.average_item_level}</div>
                        <div>착용:{ data.equipped_item_level}</div>
                        <div>쐐기돌:{ Math.round(data.current_mythic_rating,0)}</div>
                    </div>
                </td>
                <td>
                    asd
                </td>
            </tr>
            {isModalOpen && <Modal onClose={()=>setIsModalOpen(false)}>
                <Card>
                    <CardHeader color={'primary'} textColor={'white'}>
                        {data.name}님의 신청정보
                    </CardHeader>
                    <CardContent>
                        <div className={styles.userInfo}>
                            <img src={data.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                            <div className={styles.details}>
                                <div>{data.name}<span className='txtCaption'>@{data.realm}</span></div>
                                <div>{data.character_class} Ldata.{data.level}</div>
                            </div>
                            <div className={ styles.gear }>
                                <div>평균:{ data.average_item_level}</div>
                                <div>착용:{ data.equipped_item_level}</div>
                                <div>쐐기돌:{ Math.round(data.current_mythic_rating,0)}</div>
                            </div>
                            <div className={ styles.exLinks}>
                                <a href={`https://worldofwarcraft.blizzard.com/ko-kr/character/kr/${data.realm}/${data.name}`} target='_blank' rel="noopener noreferrer">
                                    <img src={ require('assets/images/wow_logo.png')} alt='wow_logo_img'/>
                                </a>
                                <a href={`https://www.warcraftlogs.com/character/kr/${data.realm}/${data.name}`} target='_blank' rel="noopener noreferrer">
                                    <img src={ require('assets/images/wcl_logo.png')} alt='wcl_logo_img'/>
                                </a>
                            </div>
                        </div>
                        <div className={styles.applyDetails}>
                            <div>
                                <div>Position</div>
                                <div className={styles.spec} style={{width:'100px'}}>
                                <img src={data.spec.imgUrl} className={styles.specAvatar} alt='spec_img_url' />
                                <div style={{color:`${data.spec.color}`}} className={ styles.specName}>{ data.spec.spec}</div>
                                </div>
                            </div>
                            <div>
                                <div>남긴 말</div>
                                <div>{ data.pivot.apply }</div>
                            </div>
                        </div>
                    </CardContent>
                    <CardAction>
                        <Button color={'success'} onClick={()=> setIsModalOpen(false)}>수락</Button>
                        <Button color={'alert'} onClick={()=> setIsModalOpen(false)}>거절</Button>
                        <Button color={'alert'} onClick={()=> setIsModalOpen(false)}>닫기</Button>
                    </CardAction>
                </Card>
            </Modal>}
            
        </>
    )

}

export default ScheduleApplicantItem