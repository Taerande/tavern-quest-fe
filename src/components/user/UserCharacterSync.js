import { getAccessToken, getCharacter, getUserCharacters } from "api/blizzardApi";
import LoadingSpinner from "components/ui/LoadingSpinner";
import { useEffect, useState } from "react"
import CharacterCard from 'components/character/CharacterCard';
import Button from "components/ui/Button";
import { db } from "plugin/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UserCharacterSync = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [availableCharacters, setAvailableCharacters] = useState([]);
    const [selected, setSelected] = useState([]);
    const [syncLoading, setSyncLoading] = useState(false);
    const auth = useSelector(state => state.auth);
    const history = useNavigate();
    
    useEffect(() => {
        const postProcess = async () => {
            const access_token = Cookies.get('blizzard_access_token');
            const oauth_token = Cookies.get('blizzard_oauth_token');
            if (!oauth_token) { return history('/user/character'); }
            if (!access_token) { await getAccessToken(); }
            const response = await getUserCharacters();
            let promises = [];
            response.wow_accounts.forEach((v) => {
                v.characters.forEach(async(el) => {
                    if (el.level > 59) {
                         promises.push(getCharacter(el.realm.slug, el.name.toLowerCase()));
                    }
                })
            })
            const temp = await Promise.all(promises);
            return temp.sort((a, b) => {
                if (a.realm === b.realm) {
                    return b.level - a.level
                }
                return b.realm - a.realm;
            });
        }
        postProcess().then((res) => {
            setAvailableCharacters(res);
            setPageLoading(false);
        });
        return () => {}
    },[])
    const selectHandler = (v) => {
        const seelctedIndex = selected.findIndex(el => el.name === v.name)
        const older = selected;
        if (seelctedIndex > -1) {
            setSelected(older.filter((item, idx) => idx !== seelctedIndex));
        } else {
            setSelected([...selected, v]);
        }
    }
    const syncSelected = async () => {
        setSyncLoading(true);
        const batch = writeBatch(db);
        selected.forEach((el) => {
            const ref = doc (db,`users/${auth.uid}/characters/`,`${el.name}-${el.realm_slug}`)
            batch.set(ref,{...el, gameId:'wow', uid:auth.uid});
        })
        
        await batch.commit().then(() => {
            history('/user/character')
        })
    }
    return (
        <section>
            {pageLoading && <LoadingSpinner size={48} width={8} />}
            {!pageLoading && <div>
                {availableCharacters.map((v,i) => {
                    return (<CharacterCard
                        selected={selected.findIndex(e => e.name === v.name) > -1 ? true : false}
                        onClick={() => selectHandler(v)}
                        key={v.name+v.realm_slug}
                        data={v} />)
                })}
                <div>
                    <Button loading={syncLoading} onClick={syncSelected}>동기화</Button>
                </div>
            </div>}
        </section>
    )

}

export default UserCharacterSync