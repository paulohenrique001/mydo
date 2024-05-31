import { useState, useEffect } from 'react';
import { mdiCloseThick } from '@mdi/js';
import Icon from '@mdi/react';

interface Task {
    id: string;
    description: string;
    checked: boolean;
}

interface TodoListProps {
    value: Task[];
    onRemoveTask: (index: string) => void;
    onToggleTask: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ value, onRemoveTask, onToggleTask }) => {
    const [taskList, setListTask] = useState<Task[]>(value);

    useEffect(() => {
        setListTask(value);
    }, [value]);

    return (
        <ul id='todo-list' className='border-2 rounded-lg overflow-auto' style={{ maxHeight: "calc(58px * 4 + 35px)" }}>
            {/* <li className="flex justify-between list-group-item task-complete">
                <div className="w-full flex">
                    <input className="mr-2" type="checkbox" checked={true} />
                    <label>Finalizar <b>MY<span className="text-blue-500">DO</span></b> 🗿🍷</label>
                </div>
                <span className="close-icon">&times;</span>
            </li> */}
            {taskList.map((task, index) => (
                <li key={index} className="p-4 border-b-2 flex justify-between">
                    <div className="w-full flex cursor-pointer" onClick={() => onToggleTask(task.id)}>
                        <input onClick={() => onToggleTask(task.id)} className="mr-2" type="checkbox" checked={task.checked} />
                        <label className={`${task.checked ? 'line-through' : ''}`}>{task.description}</label>
                    </div>
                    <span className="close-icon" onClick={() => onRemoveTask(task.id)}>
                        <Icon path={mdiCloseThick} size={0.75} title="User Profile" />
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;