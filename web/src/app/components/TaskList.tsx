import { useState, useEffect } from 'react';
import { TodoListProps } from '../interfaces/TodoListProps';
import { Task } from '../interfaces/Task';
import { mdiCloseThick } from '@mdi/js';
import Icon from '@mdi/react';

const TodoList: React.FC<TodoListProps> = ({ value, onRemoveTask, onToggleTask }) => {
    const [taskList, setListTask] = useState<Task[]>(value);

    useEffect(() => {
        setListTask(value);
    }, [value]);

    return (
        <ul id='todo-list' className='border-2 rounded-lg overflow-auto' style={{ maxHeight: "calc(58px * 4 + 35px)" }}>
            {taskList.map((task, index) => (
                <li id={task.id} key={index} className={`p-4 border-b-2 flex justify-between ${task.checked ? 'task-checked' : ''}`}>
                    <div className="w-full flex cursor-pointer" onClick={() => onToggleTask(task)}>
                        <input type="checkbox" checked={task.checked} onChange={() => onToggleTask(task)} className="mr-2" />
                        <label className={`w-full cursor-pointer ${task.checked ? 'line-through' : ''}`}>{task.description}</label>
                    </div>
                    <span className="mdi-icon close-icon" onClick={() => onRemoveTask(task.id)}>
                        <Icon path={mdiCloseThick} size={0.75} title="User Profile" />
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
