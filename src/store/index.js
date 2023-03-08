import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import scheduleSlice from "./schedule-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        schedule: scheduleSlice.reducer,
    }
});

export default store;