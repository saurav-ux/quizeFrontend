import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";  
import { quesApi } from "./quesApi";
export const store = configureStore({
    reducer:{
        [quesApi.reducerPath]:quesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quesApi.middleware),
    
});