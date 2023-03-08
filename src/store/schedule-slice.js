import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        scheduleData: null
    },
    reducers: {
        setScheduleData(state, action) {
            state.scheduleData = action.payload;
       } 
    }
});


export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice;