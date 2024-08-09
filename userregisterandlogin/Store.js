import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./slice";

const store=configureStore({
    reducer: {
        logged:loggedReducer
    }
});

export default store;