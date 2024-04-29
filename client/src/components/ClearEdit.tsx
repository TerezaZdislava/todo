import { MouseEventHandler } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface Props {
    completeAllTasks?: MouseEventHandler<HTMLButtonElement>;
    deleteCompletedTasks?: MouseEventHandler<HTMLButtonElement>;
}

function ClearEdit(props: Props) {
    return (
        <Stack spacing={2} alignItems="end" marginTop="30px">
            <ButtonGroup
                orientation="vertical"
                variant="text"
                style={{ width: "fit-content" }}
            >
                <Button onClick={props.deleteCompletedTasks}>
                    Delete all completed
                </Button>
                <Button
                    onClick={props.completeAllTasks}
                    style={{ width: "fit-content" }}
                >
                    Complete all tasks
                </Button>
                ,
            </ButtonGroup>
        </Stack>
    );
}

export default ClearEdit;
