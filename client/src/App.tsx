import "./App.css";
import React from "react";
import TodoList from "./features/Todolist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
    return (
        <>
            <TodoList />
        </>
    );
}

export default App;
