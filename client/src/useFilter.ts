import { useEffect, useState } from "react";
import { FilterOptions, Todo } from "./features/Todolist";

export const useFilter = (filter: FilterOptions, allTasks: Todo[]) => {
    const [filteredTasks, setFilteredTasks] = useState(allTasks);

    useEffect(() => {
        switch (filter) {
            case "all":
                setFilteredTasks(allTasks);
                break;
            case "active":
                setFilteredTasks(
                    allTasks.filter((task: Todo) => task.completed === false)
                );
                break;
            case "completed":
                setFilteredTasks(
                    allTasks.filter((task: Todo) => task.completed === true)
                );
                break;
            default:
                setFilteredTasks(allTasks);
        }
    }, [filter, allTasks]);

    return filteredTasks;
};
