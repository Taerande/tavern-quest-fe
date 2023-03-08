import CharacterCard from "components/character/CharacterCard"
import InvolvedCharacterCard from './InvolvedCharacterCard'
import Button from "components/ui/Button"
import Card from "components/ui/Card/Card"
import CardAction from "components/ui/Card/CardAction"
import CardContent from "components/ui/Card/CardContent"
import CardHeader from "components/ui/Card/CardHeader"
import LoadingSpinner from "components/ui/LoadingSpinner"
import Modal from "components/ui/Modal/Modal"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "store/ui-slice"
// import styles from './ApplySchedule.module.css'
import RecruitItem from "./RecruitItem"
import wowSpecs from 'assets/game_data/wowSpecs.json'
import { checkScheduleIn, applyForSchedule } from "api/partyApi"
import InputTextArea from "components/ui/Input/InputTextArea"

const ApplySchedule = ({ data }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isLogin);
    const availableCharacters = useSelector(state => state.auth.availableCharacters);
    const [filterdCharacters, setFilteredCharacters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChar, setSelectedChar] = useState('');
    const [applyLoading, setApplyLoading] = useState(false);
    const [involvedCharacter, setInvolvedCharacter] = useState([]);
    const [checkInvolvedLoading, setCheckInvolvedLoading] = useState(true);

    useEffect(() => {
        if (isModalOpen) {
            let tempArr = [];
            data.recruit.forEach((val) => {
                let filteredData = availableCharacters.filter((v) => {
                    return (val.spec.split(' ')[0] === v.active_spec || val.spec.split(' ')[0] === v.character_class);
                });
                filteredData = filteredData.map((v) => {
                    return {
                        ...v,
                        position: val.id,
                    }
                })
                tempArr = tempArr.concat(filteredData);
            });
            setFilteredCharacters(tempArr);
        }
        return () => {
            setApplyLoading(false);
            setFilteredCharacters([]);
            setSelectedChar('');
        }
    },[isModalOpen, availableCharacters, data.recruit])
    const modalHandler = async (e) => {
        e.stopPropagation();
        setCheckInvolvedLoading(true);
        setInvolvedCharacter([]);
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            await checkScheduleIn(data.id).then((res) => {
                if (res.data.involved_character.length > 0) {
                    const result = res.data.involved_character.map((v) => {
                        return {
                            ...availableCharacters.find(el => el.id === v.character_id),
                            grade: v.grade,
                            status: v.status,
                        };
                    });
                    setInvolvedCharacter([...result]);
                }
            });
        }
        setCheckInvolvedLoading(false)
    }

    const applyHandler = async () => {
        setApplyLoading(true);
        const charData = selectedChar;
        console.log(charData);
        const applyComment = document.getElementById('apply').value;
        applyForSchedule(data.id, charData, applyComment).then(() => {
            dispatch(uiActions.toggleSnackbar({ type: 'success', value: true, message: '파티에 정상적으로 지원했습니다.' }));
            setIsModalOpen(false);
        }).catch(() => {
            dispatch(uiActions.toggleSnackbar({ type: 'alert', value: true, message: '파티에 지원하지 못했습니다.' }));
            setApplyLoading(false);
        })
    }
    const selectHandler = (value) => {
        setSelectedChar(value)
    }
    return (
        <>
            <Button disabled={!isAuth} onClick={modalHandler}>지원하기</Button>
            {isModalOpen && <Modal onClose={ modalHandler }>
                <Card>
                    <CardHeader color={'primary'} textColor={'white'}>Character List</CardHeader>
                    {checkInvolvedLoading && <CardContent>
                        <LoadingSpinner/>
                    </CardContent>}
                    {!checkInvolvedLoading && involvedCharacter.length === 0 && <>
                        <CardContent>
                            {filterdCharacters.length > 0 ? <>
                                {filterdCharacters.map((v, idx) => {
                                    const positionData = wowSpecs.find(el => el.id === v.position);
                                    return (
                                        <div key={`${v.name}-${v.relam}-${idx}`}>
                                            <RecruitItem id={positionData.id} spec={positionData.spec} color={positionData.color} imgUrl=
                                            {positionData.imgUrl} />
                                            <CharacterCard selected={selectedChar.name === v.name} onClick={() => selectHandler(v)} data={v} />
                                        </div>)
                                })}
                                <InputTextArea
                                    id={'apply'}
                                    placeholder={'팀장에게 메시지를 남기세요.'}
                                    counter={"250"} />
                            </> : <p style={{ textAlign: 'center', padding: '2rem' }}>만족하는 캐릭터가 없습니다.</p>}
                        </CardContent>
                        <CardAction>
                            <Button
                                color={"primary"}
                                loading={applyLoading}
                                disabled={selectedChar ? false : true}
                                onClick={applyHandler}>
                                <div>apply</div>
                            </Button>
                            <Button color={"alert"} onClick={modalHandler}>
                                <div>close</div>
                            </Button>
                        </CardAction>
                    </>}
                    {!checkInvolvedLoading && involvedCharacter.length > 0 && <CardContent>
                        {involvedCharacter.map((v) => {
                            return <InvolvedCharacterCard key={v.id} data={ v } />
                        })}
                    </CardContent>}
                </Card>
            </Modal>}
        </>
    )

}

export default ApplySchedule