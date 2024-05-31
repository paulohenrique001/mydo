'use client';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyData from './components/EmptyData';
import { Task } from './interfaces/Task';
import { v4 as uuidv4 } from 'uuid';

import { getProjectVersion } from './utils/ApplicationUtils';

const TaskList = React.lazy(() => import('./components/TaskList'));

const Application = () => {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<string>('');
    const [listTaks, setListTaks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');

        setTimeout(() => {
            if (storedTasks) {
                setListTaks(JSON.parse(storedTasks));
            }

            setLoading(false);
        }, 500);
    }, []);

    const addTask = () => {
        if (task.trim().length >= 3) {
            const newTask: Task = {
                id: uuidv4(),
                description: task,
                checked: false,
            };

            const updatedTasks = [...listTaks, newTask];

            setTask('');
            setListTaks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } else {
            alert("Descrição da tarefa deve conter 3 caracteres ou mais!");
        }
    };

    const handleKeyPressInput = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            addTask();
        }
    };

    const toggleTask = (id: string) => {
        const updatedTasks = listTaks.map(task =>
            task.id === id ? { ...task, checked: !task.checked } : task
        );
        setListTaks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const removeTask = (id: string) => {
        const updatedTasks = listTaks.filter(task => task.id !== id);
        setListTaks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <main className='max-w-lg mx-auto p-4'>
            <header className="flex flex-col items-center justify-center text-center mb-4">
                <h1 className="text-6xl font-bold mb-0">MY<span className="text-blue-500">DO</span></h1>
                <p className="text-xl font-light mb-5">Lista de tarefas utilizando <span className="text-blue-900 font-bold">Next</span>, <span className="text-blue-900 font-bold">TypeScript</span> & <span className="text-blue-900 font-bold">Tailwind CSS</span> 😎📋</p>
                <div className="input-container flex w-full">
                    <input value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyPressInput} placeholder="📎 Novo Item..." className="block w-full rounded-lg rounded-r-none p-4 ring-2 ring-inset ring-slate-200 focus:ring-blue-400 outline-none" />
                    <button onClick={addTask} className="button w-14 rounded-lg rounded-l-none border-l-0 border-2 ring-slate-200 bg-slate-100 hover:bg-slate-200">+</button>
                </div>
            </header>

            <section className='mb-4' style={{ height: "calc(58px * 4 + 35px)", }}>
                {loading ? <LoadingSpinner /> : listTaks.length > 0 ? <TaskList value={listTaks} onRemoveTask={removeTask} onToggleTask={toggleTask} /> : <EmptyData />}
            </section>

            <footer className="text-center">
                <p className="font-mono mb-0">Desenvolvido por <a href="https://www.linkedin.com/in/paulohenrique001" target="_blank" className="no-underline font-bold">Paulo Henrique</a></p>
                <p className="font-mono mb-0">Atividades de Extensão <a href="https://www.cruzeirodosulvirtual.com.br" target="_blank" className="no-underline font-bold">Cruzeiro do Sul</a></p>
                <p className="font-mono mb-0">{getProjectVersion()} - {new Date().getFullYear()} 🚀</p>
            </footer>
        </main>
    );
};

export default Application;
