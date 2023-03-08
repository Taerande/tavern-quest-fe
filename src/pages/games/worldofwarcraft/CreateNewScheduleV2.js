import Button from '../../../components/ui/Button'
import InputText from '../../../components/ui/Input/InputText'
import InputTextArea from '../../../components/ui/Input/InputTextArea'
import SpecSelector from '../../../components/native/SpecSelector';
import Selector from '../../../components/ui/Selector/Selector';
import SelectorItem from 'components/ui/Selector/SelectorItem';
import wowDB from 'assets/game_data/wowDungeons.json';
import wowSpecs from 'assets/game_data/wowSpecs.json';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreateNewSchedule.module.css'
import { uiActions } from 'store/ui-slice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ScheduleDateTime from 'components/games/worldofwarcraft/ScheduleFilterChild/ScheduleDateTime';
import ScheduleDungeon from 'components/games/worldofwarcraft/ScheduleFilterChild/ScheduleDungeon';
import ScheduleReward from 'components/games/worldofwarcraft/ScheduleFilterChild/ScheduleReward';
import { Divider, TextField } from '@mui/material';
import { createSchedule } from 'api/partyApi';


const CreateNewSchedule = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const myCharacters = useSelector(state => state.auth.availableCharacters);
    const [recruits, setRecruits] = useState([]);
    const sumbitHandler = (e) => {
        e.preventDefault();
        const formatDateTime = (dateTimeString) => {
            if (dateTimeString) {
                return `${dateTimeString.split('T')[0]} ${dateTimeString.split('T')[1]}:00`;
            } else {
                return ''
            }
        }
        const data = {
            character_id: e.target['my_characters'].value*1,
            description: e.target['description'].value,
            title: e.target['title'].value,
            goal: e.target['goal-select'].value,
            start: formatDateTime(e.target['start-datetime'].value),
            end: formatDateTime(e.target['end-datetime'].value),
            dungeon: e.target['dungeon-select'].value,
            difficulty: e.target['difficulty-select'].value,
            reward: e.target['reward'].value ? e.target['reward'].value*1 : null,
            recruit: e.target['specList'].value,
        }
        createSchedule(data).then((res) => {
            history(`/worldofwarcraft/schedule/${res.data.schedule_id}`);
            dispatch(uiActions.toggleSnackbar({ type: 'success', message: '일정을 생성했습니다.', value: true }));
        })
    }
    
    return (<form onSubmit={sumbitHandler} className={ styles.container }>
        <Divider style={{padding:'20px'}} />
        <div className={'subTitle'}>기본 정보</div>
        <Selector placholder='내 캐릭터' id="my_characters" onSelect={(val) => console.log(val)}>
            {myCharacters.map((v) => {
                return <SelectorItem value={v.id} key={v.name + v.realm}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <img src={v.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                        <div className={styles.details}>
                            <div>{v.name}<span className='txtCaption'>@{v.realm}</span></div>
                            <div>{v.character_class} Lv.{v.level}</div>
                        </div>
                    </div>
                </SelectorItem>
            })}
        </Selector>
        <InputText
            id={'title'}
            placeholder={'제목'}
            counter={"50"}
            // onChangeText={(val) => reducerExcuter('CHANGE_TITLE',val)}
            ></InputText>
        <InputTextArea
            id={'description'}
            placeholder={'Describe Somethings'}
            counter={"250"}
            // onChangeTextArea={(val) => reducerExcuter('CHANGE_DESCRIPTION',val)}
        ></InputTextArea>
        <Divider style={{padding:'20px'}} />
        <div className={'subTitle'}>일정</div>
        <ScheduleDateTime />
        <Divider style={{padding:'20px'}} />
        <div className={'subTitle'}>인스턴스</div>
        <ScheduleDungeon />
        <Divider style={{padding:'20px'}} />
        <div className={'subTitle'}>보상</div>
        <TextField
            sx={{ width: '10rem' }}
            id="reward"
            label="보상"
            // onChange={changeMinValue}
            inputProps={{ type: 'number', inputMode: 'numeric', pattern: "^\d{0,12}$" }}
        />
        <Divider style={{padding:'20px'}} />
        <div className={'subTitle'}>클래스</div>
        <SpecSelector data={recruits} onChange={(val) => setRecruits(val)} />
        <input type='hidden' id='specList' value={recruits.map((v) => v.id)} readOnly hidden></input>
        <Button type="submit">
            <div>
                제출하기
            </div>
        </Button>
    </form>)

}

export default CreateNewSchedule