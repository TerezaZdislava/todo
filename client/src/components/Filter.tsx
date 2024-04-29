import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FilterOptions } from "../features/Todolist";

export type FilterProps = {
    isSmallScreen: boolean;
    completedTasks: number;
    allTasks: number;
    setFilter(filter: FilterOptions): void;
    filter: FilterOptions;
};

function Filter(props: FilterProps) {
    return (
        <Tabs
            orientation={props.isSmallScreen ? "horizontal" : "vertical"}
            value={props.filter}
            onChange={(e, val) => props.setFilter(val)}
            sx={{ marginRight: "10px" }}
        >
            <Tab value="all" label={`All (${props.allTasks})`} />
            <Tab
                value={"active"}
                label={`ACtive (${props.allTasks - props.completedTasks})`}
            />
            <Tab
                value={"completed"}
                label={`Completed (${props.completedTasks})`}
            />
        </Tabs>
    );
}

export default Filter;
