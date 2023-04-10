import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import catalogReducer from "./catalog";

const rootReduser = combineReducers({
    catalog: catalogReducer,
    cart: cartReducer
});

const store = configureStore({
    reducer: rootReduser
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
