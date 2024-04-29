import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import todoReducer from "./reducer/Todoreducer";

export const store = createStore(todoReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
