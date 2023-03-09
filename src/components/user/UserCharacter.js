import Button from "components/ui/Button"
import styles from './UserCharacter.module.css'
import { useSelector } from "react-redux"
import {Divider} from '@mui/material'
import { useNavigate } from "react-router-dom"
import CharacterCard from "components/character/CharacterCard"
import Cookies from "js-cookie"

// const FRONT_END_URL = process.env.REACT_APP_FRONT_END_URL

const UserCharacter = () => {
    const history = useNavigate();
    const getUserCharactersHandler = () => {
        const oauth_token = Cookies.get('blizzard_oauth_token');
        if (oauth_token) {
            history('/user/character/sync');
        } else {
            window.location.href = `https://oauth.battle.net/authorize?client_id=ebb58d5acd4948628b46f1653de70763&scope=wow.profile&redirect_uri=${process.env.REACT_APP_FRONT_END_URL}/user/character&response_type=code&state=wow_blizzard`;
        }
    }
    // const dispatch = useDispatch();
    const myCharacters = useSelector(state => state.auth.availableCharacters);
    // const userUid = useSelector(state => state.auth.uid);

    return (
        <div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>내 캐릭터</div>
            <div>
                {myCharacters.length > 0 && myCharacters.map((v,i) => {
                    return <CharacterCard key={v.name} data={v} />
                })}
                {myCharacters.length === 0 && <p>No Characters. Sync first</p>}
            </div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>게임 데이터 동기화 하기</div>
            <div>
                <Button onClick={getUserCharactersHandler}>
                    <img className={styles.avatar} src={require('assets/images/wow_logo.png')} alt='sync_wow' />
                    <div className="txtTitle">World Of Warcraft</div>
                </Button>
            </div>
        </div>
    )

}

export default UserCharacter