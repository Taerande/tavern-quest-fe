import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        snackbar: {
            snackbarIsShow: false,
            snackbarMessage: '',
            snackbarType: 'success',
        }
    },
    reducers: {
        toggleSnackbar(state, action) {
            state.snackbar.snackbarIsShow = action.payload.value;
            state.snackbar.snackbarMessage = action.payload.message;
            state.snackbar.snackbarType = action.payload.type;
       } 
    }
});


export const uiActions = uiSlice.actions;
export default uiSlice;