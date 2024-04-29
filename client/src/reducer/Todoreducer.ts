import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { Todo } from "../features/Todolist";
import axios from "axios";
import { RootState } from "../store";

export type TodoState = {
    loading: boolean;
    errorMessage: string;
    tasks: Todo[];
    completedTasks: Todo[];
};

const createSliceWithThunks = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const todoSlice = createSliceWithThunks({
    name: "todo",
    initialState: {
        loading: false,
        tasks: [],
        completedTasks: [],
        errorMessage: "",
    } as TodoState,
    reducers: (create) => ({
        editTaskText: create.asyncThunk(
            async (data: Partial<Todo>) => {
                await axios.post(`/tasks/${data.id}`, {
                    text: data.text,
                });
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Edit text failed";
                },
                fulfilled: (state) => {
                    state.loading = false;
                },
            }
        ),

        editTaskStatus: create.asyncThunk(
            async (data: Partial<Todo>) => {
                const completed = data.completed ? "complete" : "incomplete";
                await axios.post(`/tasks/${data.id}/${completed}`);
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Edit status failed";
                },
                fulfilled: (state) => {
                    state.loading = false;
                },
            }
        ),

        deleteTask: create.asyncThunk(
            async (id: string) => {
                await axios.delete(`/tasks/${id}`);
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Delete task failed";
                },
                fulfilled: (state) => {
                    state.loading = false;
                },
            }
        ),

        addTodo: create.asyncThunk(
            async (text: string) => {
                await axios.post("/tasks", {
                    text: text,
                });
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Add task failed";
                },
                fulfilled: (state) => {
                    state.loading = false;
                },
            }
        ),

        fetchTasks: create.asyncThunk(
            async (_: void) => {
                const res = await fetch("/tasks");
                return (await res.json()) as Todo[];
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Getting data failed";
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.tasks.length = 0;
                    action.payload.forEach((task) => state.tasks.push(task));
                },
            }
        ),
        fetchCompletedTasks: create.asyncThunk(
            async (_: void) => {
                const res = await fetch("/tasks/completed");
                return (await res.json()) as Todo[];
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state) => {
                    state.loading = false;
                    state.errorMessage = "Getting data failed";
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.completedTasks.length = 0;
                    action.payload.forEach((task) =>
                        state.completedTasks.push(task)
                    );
                },
            }
        ),
    }),
});

export const {
    fetchTasks,
    fetchCompletedTasks,
    addTodo,
    deleteTask,
    editTaskText,
    editTaskStatus,
} = todoSlice.actions;

export const allTasks = (state: RootState) => state.tasks;

export default todoSlice.reducer;
