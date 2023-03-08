import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import styles from './AuthSection.module.css'
import {useSelector} from 'react-redux';
import Icon from '@mdi/react'
import {mdiAccount, mdiMenuDown, mdiMenuUp} from '@mdi/js'
import AuthMenu from "./AuthMenu";

import { useRef, useState } from "react";


// Have to change Img Src
const AuthSection = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const auth = useSelector(state => state.auth);
    const history = useNavigate();

    const logInHandler = () => {
        history('/signin');
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const authMenuRef = useRef();


    return (<div className={styles.container} ref={authMenuRef}>
        {auth.isLogin && 
            <div className={styles.userMenu} onClick={toggleMenu}>
                {auth.photoUrl
                    ? <img className={styles.avatar} alt="profile_img" src={auth.photoUrl} />
                    : <Icon path={mdiAccount} size={1.2}/>}
                {auth.displayName ?
                    <span>{auth.displayName}</span> :
                    <span>Guest</span>
                }
                <Icon path={menuOpen ?mdiMenuUp : mdiMenuDown} size={1} color="black"/>
            </div>
        }
        {menuOpen && <AuthMenu authMenuRef={authMenuRef} onClose={toggleMenu}/>}
        {!auth.isLogin && <Button onClick={logInHandler} color="info" variant="contained" >
            <Icon path={mdiAccount} size={1} color="white" />
            <span>로그인</span>
        </Button>}
    </div>)

}

export default AuthSection