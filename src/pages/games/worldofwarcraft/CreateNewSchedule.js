import Button from '../../../components/ui/Button'
import InputText from '../../../components/ui/Input/InputText'
import InputTextArea from '../../../components/ui/Input/InputTextArea'
import InputDateTime from '../../../components/ui/Input/InputDateTime';
import SpecSelector from '../../../components/native/SpecSelector';
import Selector from '../../../components/ui/Selector/Selector';
import SelectorItem from 'components/ui/Selector/SelectorItem';
import wowDB from 'assets/game_data/wowDungeons.json';
import { useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreateNewSchedule.module.css'
import { uiActions } from 'store/ui-slice';
import { addNewSchedule } from 'api/firebaseApi';
import { useNavigate } from 'react-router-dom';
const wowDungeons = wowDB;

const CreateNewSchedule = () => {
    console.log('hi');
    
    const dispatch = useDispatch();
    const history = useNavigate();
    const myCharacters = useSelector(state => state.auth.availableCharacters);
    const authorUid = useSelector(state => state.auth.uid);
    const initState = {
        representativeCharacter:null,
        title: null,
        description: null,
        dateTime:{
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            isValid: false,
            errorMessage: "",
        },
        expansion: null,
        type: null,
        place: null,
        difficulty: null,
        goal: null,
        recruit:[],
        availableType: [],
        availableDifficulty: [],
    };
    const setScheduleData =  useCallback((state, action) => {
        switch (action.type) {
            case 'CHANGE_REPCHAR':
                const repChar = myCharacters.find((v) => `${v.name}-${v.realm}` === action.payload);
                return {
                    ...state,
                    representativeCharacter: repChar
                }
            case 'CHANGE_TITLE':
                return {
                    ...state,
                    title: action.payload
                }
            case 'CHANGE_DESCRIPTION':
                return {
                    ...state,
                    description: action.payload
                }
            case 'CHANGE_DATETIME':
                return {
                    ...state,
                    dateTime: action.payload
                }
            case 'CHANGE_EXPANSION':
                const temp = wowDungeons.find((v) => v.id === action.payload);
                const tempType = [];
                if (temp.raids.length > 0) {
                    tempType.push({ id: 'raids', name: '?????????' });
                }
                if (temp.dungeons.length > 0) {
                    tempType.push({ id: 'dungeons', name: '??????' });
                }
                return {
                    ...state,
                    expansion: action.payload,
                    availableType: tempType,
                }
            case 'CHANGE_TYPE':
                return {
                    ...state,
                    availableDifficulty: action.payload === 'raids' ? ['??????','??????','??????','???????????????'] : ['??????+','??????','??????','??????'],
                    type: action.payload
                }
            case 'CHANGE_PLACE':
                return {
                    ...state,
                    place: action.payload
                }
            case 'CHANGE_GOAL':
                return {
                    ...state,
                    goal: action.payload
                }
            case 'CHANGE_DIFF':
                return {
                    ...state,
                    difficulty: action.payload
                }
            case 'CHANGE_RECRUIT':
                return {
                    ...state,
                    recruit: action.payload
                }
            default:
                return state
        }
    },[initState])
    const [scheduleData, dispatchScehduleData] = useReducer(setScheduleData, initState);

    // const reducerExcuter = useCallback((type, payload) => {
    //         dispatchScehduleData({ type, payload })
    //     },[])

    const sumbitHandler = (e) => {
        e.preventDefault();
        // need some validation;
        if (!authorUid) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '???????????? ?????? ???????????????.'}))
        }

        if (!scheduleData.representativeCharacter) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '?????? ???????????? ???????????????.'}))
        }
        if (!scheduleData.title) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '????????? ???????????????.'}))
        }
        if (!scheduleData.description) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '????????? ???????????????.'}))
        }
        // Date Time Validation
        if (!scheduleData.dateTime.isValid) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type: 'alert', message: scheduleData.dateTime.errorMessage }))
        } 
        if (!scheduleData.expansion) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '???????????? ???????????????.'}))
        }
        if (!scheduleData.type) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '??????/????????? ???????????????.'}))
        }
        if (!scheduleData.place) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '????????? ???????????????.'}))
        }
        if (!scheduleData.difficulty) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: '???????????? ???????????????.'}))
        }
        if (scheduleData.recruit.length < 1) {
            return dispatch(uiActions.toggleSnackbar({ value: true, type:'alert', message: ' ?????? ????????? ??? ????????? ???????????????.'}))
        }


        const start_datetime = new Date(scheduleData.dateTime.start_date+ ' ' + scheduleData.dateTime.start_time + ':00');
        const end_datetime = new Date(scheduleData.dateTime.end_date + ' ' + scheduleData.dateTime.end_time + ':00');

        // result ?????? ?????? sate??? ???????????????;
        // ????????? validation ?????????;
        const result = {
            title: scheduleData.title,
            description: scheduleData.description,
            authorId: authorUid,
            createdAt: new Date(),
            updatedAt: new Date(),
            repChar: scheduleData.representativeCharacter,
            gameId: 'wow',
            start: new Date(start_datetime),
            difficulty: scheduleData.difficulty,
            expansion: scheduleData.expansion,
            place: scheduleData.place,
            goal: scheduleData.goal,
            end: new Date(end_datetime),
            recruit: scheduleData.recruit,
        }
        addNewSchedule(result).then(() => {
            dispatch(uiActions.toggleSnackbar({value:true, type:'success', message:'???????????? ?????? ???????????????.'}))
            history(`/worldofwarcraft/schedule/${result.repChar.name}-${result.repChar.realm_slug}-${result.createdAt.getTime()}`)
        });
    }
    
    return (<form onSubmit={sumbitHandler} style={{ margin: '0 auto', width: '500px', rowGap: '20px', display: 'flex', flexDirection: 'column', columnGap: '10px' }}>
        <Selector placholder='??? ?????????' id="my_characters" onSelect={(value) => { dispatchScehduleData({ type: 'CHANGE_REPCHAR', payload: value })}}>
            {myCharacters.map((v) => {
                return <SelectorItem value={`${v.name}-${v.realm}`} key={v.name + v.realm}>
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
            placeholder={'??????'}
            counter={"50"}
            onChangeText={(val) => dispatchScehduleData({type:'CHANGE_TITLE',payload:val})}
            // onChangeText={(val) => reducerExcuter('CHANGE_TITLE',val)}
            ></InputText>
        <InputTextArea
            id={'description'}
            placeholder={'Describe Somethings'}
            counter={"250"}
            onChangeTextArea={(val) => dispatchScehduleData({type:'CHANGE_DESCRIPTION',payload:val})}
            // onChangeTextArea={(val) => reducerExcuter('CHANGE_DESCRIPTION',val)}
        ></InputTextArea>
        {/* <InputDateTime
            dateTime={scheduleData.dateTime}
            onChange={(val) => dispatchScehduleData({ type: 'CHANGE_DATETIME', payload: val })} /> */}
        <Selector onSelect={(val) => {dispatchScehduleData({type:'CHANGE_EXPANSION',payload:val})}} placholder="?????????" id="expansion">
            {wowDungeons.map((v) => {
                return (
                    <SelectorItem key={v.id} value={v.id}>
                        <div>
                            {v.name}
                        </div>
                    </SelectorItem>
                )
            })}
        </Selector>
        {scheduleData.availableType.length > 0 && <Selector onSelect={(val) => { dispatchScehduleData({ type: 'CHANGE_TYPE', payload: val }) }} placholder="??????" id="type">
            {scheduleData.availableType.map((v) => {
                return (
                    <SelectorItem key={v.id} value={v.id}>
                        <div>
                            {v.name}
                        </div>
                    </SelectorItem>
                )
            })}
        </Selector>}
        {scheduleData.type && <Selector onSelect={(val) => { dispatchScehduleData({ type: 'CHANGE_PLACE', payload: val }) }} placholder="??????" id="place">
            {wowDungeons.find((v)=>v.id === scheduleData.expansion)[scheduleData.type].map((v) => {
                return (
                    <SelectorItem key={v.id} value={v.id}>
                        <div>
                            {v.name}
                        </div>
                    </SelectorItem>
                )
            })}
        </Selector>}
        {scheduleData.place && <Selector onSelect={(val) => { dispatchScehduleData({ type: 'CHANGE_DIFF', payload: val }) }} placholder="?????????" id="difficulty">
                {scheduleData.availableDifficulty.map((v) => {
                        return (
                            <SelectorItem key={v} value={v}>
                                <div>
                                    {v}
                                </div>
                            </SelectorItem>
                        )
                    })
                }
        </Selector>}
        {/* <InputText
            id={'goal'}
            placeholder={'??????, ??????) All, 3???, 9??? etc..'}
            counter={"50"}
            onChangeText={(val)=>dispatchScehduleData({type:'CHANGE_GOAL',payload:val})}
        ></InputText> */}
        {/* ?????? */}
        <SpecSelector data={scheduleData.recruit} onChange={(val) => dispatchScehduleData({type:'CHANGE_RECRUIT',payload:val})} />
        <Button type="submit">
            <div>
                ????????????
            </div>
        </Button>
    </form>)

}

export default CreateNewSchedule