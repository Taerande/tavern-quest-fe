import { mdiAlarm, mdiCircle, mdiEmail } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from './UserScheduleTableItem.module.css'
import wowDungeons from 'assets/game_data/wowDungeons.json'
import { Chip } from "@mui/material";
import { updateStatus } from "api/partyApi";
import { useNavigate } from "react-router-dom";
let allInstances = [];
wowDungeons.map((v) => { return allInstances = [...allInstances, ...v.instances] });


const UserScheduleTableItem = ({ data, disabled }) => {
    const listStatusRef = useRef();
    const navigate = useNavigate();
    const availableCharacters = useSelector(state => state.auth.availableCharacters);
    const [status, setStatus] = useState({id:0, name:'미확정', color:'warning'});
    const partChar = availableCharacters.find((v) => v.id === data.pivot.character_id);
    const [statusListOpen, setStatusListOpen] = useState(false);
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
    useEffect(() => {
        const tempStatus = statusSet.find((v) => v.id === data.pivot.status * 1);
        setStatus(tempStatus);
        const handleClickOutside = (event) => {
            if (!listStatusRef.current.contains(event.target)) {
                setStatusListOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateStatusHandler = (e, scheduleInfo, newStatus) => {
        e.stopPropagation();
        if (status.id*1 === newStatus*1) {
            setStatusListOpen(false);
            return
        }
        const character_id = scheduleInfo.pivot.character_id;
        const schedule_id = scheduleInfo.id;
        const tempStatus = statusSet.find((v) => v.id === newStatus * 1);
        updateStatus(character_id, schedule_id, newStatus).then(() => {
            setStatusListOpen(false);
            setStatus(tempStatus);
        })
    }
    const opneListHandler = (e) => {
        e.stopPropagation();
        setStatusListOpen(true);
    }
    if (partChar) {
        return (
            <tr className={styles.container} onClick={()=>{
                navigate(`/worldofwarcraft/schedule/${data.id}`);
            }}>
                <td className={styles.status} onClick={opneListHandler} ref={listStatusRef}>
                    <div className={styles.currentStatus}>
                        <Icon path={mdiCircle} color={`var(--${status.color}-color)`} size={1} />
                        { status.name }
                    </div>
                    {statusListOpen && !disabled && <ul className={styles.statusList}>
                        {statusSet.map((v) => {
                            return (
                                <li key={v.id} value={v.id} style={{ color: `var(--${v.color}-color)` }}
                                    onClick={(e) => updateStatusHandler(e, data, v.id)}
                                >
                                    <Icon path={mdiCircle} color={`var(--${v.color}-color)`} size={0.7} />
                                    {v.name}
                                </li>
                            )
                        })}
                    </ul>}
                </td>
                <td>
                    { data.pivot.grade }
                </td>
                <td className={styles.characterInfo}>
                    <img src={partChar.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                    <div className={styles.details}>
                        <div>{partChar.name}<span className='txtCaption'>@{partChar.realm}</span></div>
                        <div>{partChar.character_class} Lv.{partChar.level}</div>
                    </div>
                </td>
                {/* 위치, 시작, 정보만 */}
                <td className={styles.partyInfo}>
                    <div>
                        {data.start} ~ {data.end}
                    </div>
                </td>
                <td>
                    <div>
                        <Chip size='small' label={`${allInstances.find(el => el.id === data.dungeon).name} (${data.difficulty.toUpperCase().slice(0,1)})`} />
                        <Chip size='small' label={data.goal} />
                    </div>
                </td>
                <td>
                    <div>
                        <Icon path={mdiEmail} size={1}></Icon>
                        <Icon path={mdiAlarm} size={1}></Icon>
                    </div>
                </td>
            </tr>
        )
    } else {
        return (
        <tr>
            <td colSpan='12' style={{textAlign:'center',fontSize: '1.2rem',fontWeight:'bold'}}>알 수 없는 유저</td>
        </tr>
        )
    }

}

export default UserScheduleTableItem