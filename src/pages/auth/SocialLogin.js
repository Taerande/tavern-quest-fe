import { socialLogin } from "api/loginApi";
import LoadingSpinner from "components/ui/LoadingSpinner"
import Cookies from "js-cookie";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { authActions } from "store/auth-slice";
import { uiActions } from "store/ui-slice";

const SocialLogin = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        socialLogin(params.provider, searchParams.get('code'), searchParams.get('state'))
        .then((res) => {
            const userData = res.data.response.user;
            Cookies.set('session_cookie',res.data.response.token);
            dispatch(authActions.setUser({ isLogin: true, uid: userData.id, displayName: userData.name, photoUrl: userData.photoUrl, email: userData.email }));
        })
        .then(() => {
            dispatch(uiActions.toggleSnackbar({type:'success', message:'로그인에 성공했습니다.', value:true}))
            navigate('/');
        })
        .catch(() => {
            dispatch(uiActions.toggleSnackbar({type:'error', message:'로그인 정보가 잘못 되었습니다.', value:true}))
            navigate('/');
         });
    },[dispatch, navigate, params.provider, searchParams])
    return (
        <div>
            <LoadingSpinner />
            <div>Login Processing...</div>
        </div>
    )

}

export default SocialLogin