import { useState, useEffect } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []); // Executa apenas uma vez, ao montar o componente

    const addTask = () => {
        if (newTask.trim() !== '') {
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setNewTask('');
        }
    };

    const removeTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex mb-4">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm flex justify-between items-center"
                    >
                        {task}
                        <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeTask(index)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;