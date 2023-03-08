import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        uid:null,
        displayName: null,
        photoUrl: null,
        availableCharacters:[],
    },
    reducers: {
        setUser(state, action) {
            state.isLogin = true;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.email_verified_at = action.payload.email_verified_at;
            state.displayName = action.payload.displayName;
            state.photoUrl = action.payload.photoUrl;
        },
        logout(state) {
            state.isLogin = false;
            state.displayName = null;
            state.uid = null;
            state.photoUrl = null;
            state.availableCharacters = [];
            localStorage.removeItem('userInfo');
            sessionStorage.removeItem('userInfo');
            Cookies.remove('blizzard_oauth_token');
            Cookies.remove('session_cookie');
        },
        setAvailableCharacter(state,action) {
            state.availableCharacters = action.payload;
        }
    },
});


export const authActions = authSlice.actions;
export default authSlice;