import Button from '../../../components/ui/Button'
import InputTextArea from '../../../components/ui/Input/InputTextArea'
import Selector from '../../../components/ui/Selector/Selector';
import SelectorItem from 'components/ui/Selector/SelectorItem';
import wowDB from 'assets/game_data/wowDungeons.json';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreateNewSchedule.module.css'
import { uiActions } from 'store/ui-slice';
import { useNavigate } from 'react-router-dom';
import wowSpec from 'assets/game_data/wowSpecs.json';
import { useState } from 'react';
import { addNewMercenary } from 'api/firebaseApi';
const wowDungeons = wowDB;

const places = [...wowDungeons.find((v) => v.id === 'dragonflight').dungeons,...wowDungeons.find((v) => v.id === 'dragonflight').raids]

const CreateNewSchedule = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const myCharacters = useSelector(state => state.auth.availableCharacters);

    const sumbitHandler = (e) => {
        e.preventDefault();
        const charData = myCharacters.find(v => `${v.name}-${v.realm}` === e.target[0].value);
        const data = {
            repChar: charData,
            spec: e.target[1].value,
            place: e.target[2].value,
            difficulty: e.target[3].value,
            description: e.target[4].value
        }
        addNewMercenary(data).then(() => {
            dispatch(uiActions.toggleSnackbar({value:true, type:'success', message:'용병으로 등록이 되었습니다.'}))
            history(`/worldofwarcraft/mercenary/${charData.name}-${charData.realm_slug}`);
        });
        // need some validation;
    };
    const changeAvailableSpecs = (val) => {
        setAvailableSpecs([])
        const char =myCharacters.find((v) => `${v.name}-${v.realm}` === val);
        setTimeout(() => {
            setAvailableSpecs(wowSpec().filter((v) => v.spec.includes(char.character_class)));
        }, 0);
    }
    const [availableSpecs, setAvailableSpecs] = useState([]);
    
    return (<form onSubmit={sumbitHandler} style={{ margin: '0 auto', width: '500px', rowGap: '20px', display: 'flex', flexDirection: 'column', columnGap: '10px' }}>
        <Selector placholder='내 캐릭터' id="my_characters" onSelect={(val) => { changeAvailableSpecs(val) }}>
            {myCharacters.map((v) => {
                return <SelectorItem value={`${v.name}-${v.realm}`} key={v.name + v.realm}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={v.mediaAvatar[0].value} alt='wow_char_profile_img' className={styles.avatar} />
                        <div className={styles.details}>
                            <div>{v.name}<span className='txtCaption'>@{v.realm}</span></div>
                            <div>{v.character_class} Lv.{v.level}</div>
                        </div>
                    </div>
                </SelectorItem>
            })}
        </Selector>
        {availableSpecs.length > 0 && <Selector onSelect={(val) => { }} placholder="역할" id="spec">
        {availableSpecs.map((v, i) => {
            return (
                <SelectorItem value={v.spec} key={v.spec} style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ width: '36px', height: '36px', borderRadius: '50%', margin: '2px' }} src={v.imgUrl} alt="recruit_spec_img" />
                    {v.spec}
                </SelectorItem>
            )
        })}
        </Selector>}
        <Selector onSelect={(val) => { }} placholder="장소" id="place">
            {places.map((v) => {
                return (
                    <SelectorItem key={v.id} value={v.id}>
                        {v.name}
                    </SelectorItem>
                )
            })}
        </Selector>
        <Selector onSelect={(val) => { }} placholder="난이도" id="difficulty">
            {['신화','영웅','일반','쐐기돌'].map((v) => {
                return (
                    <SelectorItem key={v} value={v}>
                        <div>
                            {v}
                        </div>
                    </SelectorItem>
                )
            })}
        </Selector>
        <InputTextArea
            id={'description'}
            placeholder={'Describe Somethings'}
            counter={"250"}
            onChangeTextArea={(val) => {}}
            // onChangeTextArea={(val) => reducerExcuter('CHANGE_DESCRIPTION',val)}
        ></InputTextArea>
        <Button type="submit">
            <div>
                제출하기
            </div>
        </Button>
    </form>)

}

export default CreateNewSchedule