import { ChangeEvent } from "react";
import { Todo } from "./Todolist";
import Checkbox from "@mui/material/Checkbox";
import { InputProps } from "@mui/material/Input";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Divider from "@mui/material/Divider";

export type ItemProps = {
    todo: Todo;
    handleStatusCHange(e: ChangeEvent<HTMLInputElement>, id: string): void;
    handleTitleChange(text: string, id: string): void;
    handleDelete(id: string): void;
};

const Item = styled(Paper)(() => ({
    padding: "8px",
    textAlign: "center",
    display: "flex",
    margin: "15px",
}));

interface StyledInputProps extends InputProps {
    completed: string;
}

const MyInput = styled(InputBase)<StyledInputProps>(({ completed }) => ({
    width: "100%",
    color: completed === "true" ? "grey" : "black",
    textDecoration: completed === "true" ? "line-through" : "none",
}));

function TodoItem(props: ItemProps) {
    return (
        <Item key={props.todo.id}>
            <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={props.todo.completed === true}
                onChange={(e) => props.handleStatusCHange(e, props.todo.id)}
            />
            <MyInput
                completed={props.todo.completed.toString()}
                id={props.todo.id}
                onChange={(e) =>
                    props.handleTitleChange(e.target.value, props.todo.id)
                }
                defaultValue={props.todo.text}
            />
            <IconButton
                aria-label="edit"
                size="small"
                onClick={() => {
                    document.getElementById(props.todo.id)?.focus();
                }}
                style={{ width: "42px" }}
            >
                <EditOutlinedIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                style={{ width: "42px" }}
                aria-label="delete"
                size="small"
                onClick={() => props.handleDelete(props.todo.id)}
            >
                <DeleteIcon />
            </IconButton>
        </Item>
    );
}

export default TodoItem;
