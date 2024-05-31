import { Task } from "./Task";

export interface TodoListProps {
    value: Task[];
    onRemoveTask: (index: string) => void;
    onToggleTask: (id: Task) => void;
}