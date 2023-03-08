import Button from "components/ui/Button"
import styles from './UserCharacter.module.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getOauth } from "api/blizzardApi"
import { authActions } from "store/auth-slice"
import CharacterCard from "components/character/CharacterCard"
import Cookies from "js-cookie"

const FRONT_END_URL = process.env.REACT_APP_FRONT_END_URL

const UserCharacter = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const myCharacters = useSelector(state => state.auth.availableCharacters);
    const userUid = useSelector(state => state.auth.uid);

    return (
        <div>
            <div>
                <div>캐릭터 동기화</div>
                <Button>
                    <img className={styles.avatar} src={require('assets/images/wow_logo.png')} alt='sync_wow' />
                    <div className="txtTitle">World Of Warcraft</div>
                </Button>
            </div>
            <div>
                {myCharacters.length > 0 && myCharacters.map((v,i) => {
                    return <CharacterCard key={v.name} data={v} />
                })}
                {myCharacters.length === 0 && <p>No Characters. Sync first</p>}
            </div>
        </div>
    )

}

export default UserCharacter