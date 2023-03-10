import Button from 'components/ui/Button'
import InputText from 'components/ui/Input/InputText'
import styles from './SignIn.module.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uiActions } from 'store/ui-slice';
import { loginToLaravel } from 'api/partyApi';
import { Divider } from "@mui/material"
import Cookies from 'js-cookie';
import { getLaravelAuth } from 'store/auth-actions';



const SignIn = () => {
    const dispatch = useDispatch()
    const history = useNavigate();
    const [autoLogin, setAutoLogin] = useState(false);
    // const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
    const [emailBtnLoading, setEmailBtnLoading] = useState(false);

    const autoLoginOnChangeHandler = (e) => {
        setAutoLogin(e.target.checked);
    }
    // const googleLoginHandler = () => {
    //     setGoogleBtnLoading(true);
    //     const provider = new GoogleAuthProvider();
    //     const persistenceLogin = autoLogin ? browserLocalPersistence : browserSessionPersistence;
    //     provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    //     setPersistence(auth, persistenceLogin).then(() => {
    //         signInWithPopup(auth, provider)
    //             .then((result) => {
    //                 const user = result.user;
    //                 dispatch(authActions.setUser({ isLogin: true, uid: user.uid, displayName: user.displayName, photoUrl: user.photoURL }));
    //                 if (autoLogin) {
    //                     localStorage.setItem('userInfo', JSON.stringify(user));
    //                 } else {
    //                     sessionStorage.setItem('userInfo', JSON.stringify(user));
    //                 }
    //                 setDoc(doc(db, "users", user.uid), {
    //                     displayName: user.displayName,
    //                     photoURL: user.photoURL,
    //                     uid: user.uid
    //                 })
    //                 setGoogleBtnLoading(false);
    //                 history('/');
                    
    //             }).catch((error) => {
    //                 dispatch(uiActions.toggleSnackbar({ type: 'alert', message: '????????? ????????? ?????????????????????.', value: true }))
    //                 setGoogleBtnLoading(false);
                    
    //             });
    //     })
    // }
    const emailLoginHandler = (e) => {
        e.preventDefault();
        setEmailBtnLoading(true);
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value,
            'autoLogin': e.target.autoLogin.value
        }
        loginToLaravel(data).then(async(res) => {
            if (res.data.token) {
                if (res.data.autoLogin === 'true') {
                    Cookies.set('session_cookie', res.data.token, {expires: 30});
                } else {
                    Cookies.set('session_cookie', res.data.token);
                }
                await dispatch(getLaravelAuth());
                // dispatch(authActions.setUser({ isLogin: true, uid: user.id, displayName: user.name, photoUrl: user.photoUrl }));
                setEmailBtnLoading(false);
                dispatch(uiActions.toggleSnackbar({type:'success',message:'???????????? ?????????????????????.', value:true}))
            } else {
                setEmailBtnLoading(false);
                dispatch(uiActions.toggleSnackbar({type:'error',message:'????????? ????????? ?????? ???????????????.', value:true}))
            }
        }).catch(() => {
            setEmailBtnLoading(false);
            dispatch(uiActions.toggleSnackbar({type:'alert',message:'????????? ????????? ?????? ???????????????.', value:true}))
        }).then(() => {
            history('/');
        });
        
    }
    return (
        <div className={styles.container}>
             <div style={{display: 'flex', columnGap:'1rem', justifyContent:'center', alignItems:'center'}}>
                <img style={{ width: '80px', height: '80px' }} src={require('assets/images/logo128.png')} alt="logo_img" />
                <div style={{textDecoration:'none',color:'var(--primary-color)',fontWeight:'700',fontSize:'3rem'
                }}>TavernQuest</div>
            </div>
            <div className={styles.title}>????????? / ????????????</div>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>?????? ?????????</div>
                {/* <Button block={true} loading={googleBtnLoading} color="info" onClick={googleLoginHandler}>
                    <img src={require('assets/images/social_providers/google_logo.png') } alt="google_login"></img>
                    <span>????????? ?????????</span>
                </Button> */}
            <Button block={true} disabled>
                <img src={require('assets/images/social_providers/naver_logo.png') } alt="google_login"></img>
                <span style={{padding: '10px'}}>???????????? ?????????</span>
            </Button>
            <Button block={true} color="warning" disabled>
                <img src={require('assets/images/social_providers/kakao_logo.png') } alt="google_login"></img>
                <span style={{padding: '10px'}}>???????????? ?????????</span>
            </Button>
            <Divider style={{padding:'20px'}} />
            <div className={'subTitle'}>???????????? ?????????</div>
            <form onSubmit={emailLoginHandler}>
                <InputText id="email" placeholder={'????????? ??????'}></InputText>
                <InputText id="password" type="password" placeholder={'????????????'}></InputText>
                <div>
                    <div>
                        <label htmlFor='autoLogin'>???????????????</label>
                        <input value={autoLogin} onChange={autoLoginOnChangeHandler} type="checkbox" id="autoLogin"></input>
                    </div>
                    <div>???????????? ??????</div>
                </div>
                <Button block={true} loading={emailBtnLoading} type="submit">?????????</Button>
            </form>
        </div>
    )
}
export default SignIn