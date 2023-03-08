import Button from "components/ui/Button"
import styles from './UserCharacter.module.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getOauth } from "api/blizzardApi"
import { db } from "plugin/firebase"
import { collection, getDocs, query, updateDoc } from "firebase/firestore"
import { authActions } from "store/auth-slice"
import CharacterCard from "components/character/CharacterCard"
import Cookies from "js-cookie"

const UserCharacter = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const myCharacters = useSelector(state => state.auth.availableCharacters);
    const userUid = useSelector(state => state.auth.uid);

    useEffect(() => {
        const searchQ = window.location.search;
        const postProcess = async () => {
            if (searchQ.includes('state=wow_blizzard') && searchQ.includes('code')) {
                const code = searchQ.split('code=')[1].split('&')[0];
                await getOauth(code).then(()=> history('/user/character/sync'));
            }
            const q = query(collection(db, `users/${userUid}/characters`));
            const querySnapshot = await getDocs(q);
            const temp = [];
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    uid: userUid
                });
                temp.push(doc.data());
            })
            temp.sort((a,b) => b.level - a.level)
            dispatch(authActions.setAvailableCharacter(temp));
        }
        postProcess();
      return () => {
      }
    }, [])
    const getUserCharactersHandler = () => {
        const oauth_token = Cookies.get('blizzard_oauth_token');
        if (oauth_token) {
            history('/user/character/sync');
        } else {
            window.location.href = `https://oauth.battle.net/authorize?client_id=ebb58d5acd4948628b46f1653de70763&scope=wow.profile&redirect_uri=${process.env.REACT_APP_FRONT_END_URL}/user/character&response_type=code&state=wow_blizzard`;
        }
    }
    return (
        <section>
            <div>
                <div>캐릭터 동기화</div>
                <Button onClick={getUserCharactersHandler}>
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
        </section>
    )

}

export default UserCharacter