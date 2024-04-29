import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import ClearEdit from "../components/ClearEdit";
import TodoItem from "./TodoItem";

import IconButton from "@mui/material/IconButton";
import {
    TodoState,
    addTodo,
    deleteTask,
    editTaskStatus,
    editTaskText,
    fetchCompletedTasks,
    fetchTasks,
} from "../reducer/Todoreducer";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Filter from "../components/Filter";
import styled from "styled-components";
import { useFilter } from "../useFilter";
import Alert from "@mui/material/Alert";

export type Completed = boolean;
export type FilterOptions = "all" | "completed" | "active";

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdDate: Date;
    completedDate?: Date;
};

const NoData = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Headline = styled.h1`
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
`;

function TodoList() {
    const [filter, setFilter] = useState<FilterOptions>("all");
    const [taskDescription, setTaskDescription] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const allTasks = useSelector((state: TodoState) => state.tasks);
    const filteredTasks = useFilter(filter, allTasks);
    const errorMessage = useSelector((state: TodoState) => state.errorMessage);
    const completedTasks = useSelector(
        (state: TodoState) => state.completedTasks
    );

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchCompletedTasks());
    }, [dispatch]);

    const isSmallScreen = useMediaQuery("(max-width:600px)");

    function deleteCompletedTasks() {
        completedTasks.forEach((task) => dispatch(deleteTask(task.id)));
        getFreshData();
    }

    function completeAllTasks() {
        allTasks
            .filter((task: Todo) => !task.completed)
            .forEach((task: Todo) =>
                dispatch(editTaskStatus({ completed: true, id: task.id }))
            );
        getFreshData();
    }

    function addTask() {
        if (taskDescription === "") {
            alert("Please type task description");
        } else {
            dispatch(addTodo(taskDescription));
            getFreshData();
            setTaskDescription("");
        }
    }

    function handleTitleChange(text: string, id: string) {
        if (text !== "") {
            dispatch(editTaskText({ text, id }));
            getFreshData();
        } else deleteTask(id);
    }

    function handleStatusChange(e: any, id: string) {
        const completed = e.target.checked;
        dispatch(editTaskStatus({ completed, id }));
        getFreshData();
    }

    function handleDeleteTask(id: string) {
        dispatch(deleteTask(id));
        getFreshData();
    }

    function getFreshData() {
        dispatch(fetchCompletedTasks());
        dispatch(fetchTasks());
    }

    return (
        <>
            {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
            ) : null}
            <Grid
                container
                spacing={2}
                columns={{ xs: 2, sm: 12 }}
                margin={isSmallScreen ? "20px auto" : "100px auto"}
                maxWidth="800px"
            >
                <Grid item xs={2} sm={4}>
                    <Headline>Todo list</Headline>
                </Grid>
                <Grid item xs={2} sm={8}></Grid>
                <Grid item xs={2} sm={4}></Grid>
                <Grid item xs={2} sm={8} display="flex" marginBottom="20px">
                    <TextField
                        id="standard-basic"
                        label="Add task"
                        multiline
                        variant="standard"
                        fullWidth
                        maxRows={2}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        value={taskDescription}
                    />
                    <IconButton
                        aria-label="add"
                        size="large"
                        disabled={taskDescription === ""}
                        onClick={() => addTask()}
                    >
                        <AddCircleIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </Grid>

                <Grid item xs={2} sm={4}>
                    <Filter
                        isSmallScreen={isSmallScreen}
                        setFilter={setFilter}
                        allTasks={allTasks.length}
                        completedTasks={completedTasks.length}
                        filter={filter}
                    ></Filter>
                </Grid>

                <Grid item xs={2} sm={8}>
                    <Card>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((filteredTask: Todo) => (
                                <TodoItem
                                    key={filteredTask.id}
                                    todo={filteredTask}
                                    handleStatusCHange={handleStatusChange}
                                    handleTitleChange={handleTitleChange}
                                    handleDelete={handleDeleteTask}
                                />
                            ))
                        ) : (
                            <NoData>No tasks</NoData>
                        )}
                    </Card>
                </Grid>
                <Grid item xs={2} sm={12}>
                    <ClearEdit
                        deleteCompletedTasks={() => deleteCompletedTasks()}
                        completeAllTasks={() => completeAllTasks()}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default TodoList;
