import { authActions } from "./auth-slice";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "plugin/firebase";
import axios from "axios";
import Cookies from "js-cookie";
import { getCharacter } from "api/blizzardApi";
const be_url = process.env.REACT_APP_BE_URL

export const getFirebaseAuth = () => {
    return async (dispatch) => {
        // check sessionStorage, localStorage
        const localKeys = Object.keys(localStorage);
        const sessionKeys = Object.keys(sessionStorage);
        
        const session = sessionKeys.find(v => v.includes('userInfo'));
        const local = localKeys.find(v => v.includes('userInfo'));

        if (local) {
            const user = JSON.parse(localStorage.getItem(local));
            dispatch(authActions.setUser({ isLogin: true, displayName: user.displayName, photoUrl: user.photoURL }));
        }
        if (session) {
            const user = JSON.parse(sessionStorage.getItem(session));
            dispatch(authActions.setUser({ isLogin: true, displayName: user.displayName, photoUrl: user.photoURL }));
        }
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const colRef = collection(db, `/users/${user.uid}/characters`);
                const docsSnap = await getDocs(colRef);
                const temp = [];
                if (!docsSnap.empty) {
                    docsSnap.forEach((doc) => {
                        temp.push(doc.data())
                    });
                }
                dispatch(authActions.setUser({ isLogin: true, uid:user.uid, displayName: user.displayName, photoUrl: user.photoURL }));
                dispatch(authActions.setAvailableCharacter(temp));
            } else {
                dispatch(authActions.logout());
            }
        })
    }
}

export const getLaravelAuth = () => {
    return async (dispatch) => {
        const session_cookie = Cookies.get('session_cookie');
        if (session_cookie) {
            const response = await axios.post(be_url + '/user', {}, {
                headers: {
                    'Authorization': `Bearer ${session_cookie}`
                }
            });
            const userData = response.data.userData;
            const charData = response.data.charData;
            if (charData) {
                Promise.all(charData.map((v) => {
                    const name = v.name.toLowerCase().split('-');
                    return getCharacter(name[1], name[0]);
                })).then((res) => {
                    res = res.filter((el) => {
                        return el !== undefined;
                    })
                    res = res.map((val) => {
                        const temp = charData.find(el => el.name.toLowerCase().split('-')[0] === val.name.toLowerCase());
                        return {
                            id: temp.id,
                            ...val
                        }
                    })
                    dispatch(authActions.setAvailableCharacter(res));
                });
            }
            dispatch(authActions.setUser({ isLogin: true, uid:userData.id, displayName: userData.name, photoUrl: userData.photoUrl, email: userData.email, email_verified_at: userData.email_verified_at }));
        } 
    }
}