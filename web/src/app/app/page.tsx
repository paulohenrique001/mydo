'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskList = React.lazy(() => import('../components/TaskList'));

interface Task {
    id: string;
    description: string;
    checked: boolean;
}

const Loading = () => {
    return (
        <div style={{ height: "calc(58px * 4 + 35px)", backgroundColor: "blue" }}>LOADING...</div>
    );
}

const EmptyData = () => {
    return (
        <div style={{ height: "calc(58px * 4 + 35px)", backgroundColor: "red" }}>VAZIO</div>
    );
}

const Home = () => {
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
        }, 2500);
    }, []);

    const addTask = () => {
        if (task.trim().length >= 3) {
            const newTask: Task = {
                id: uuidv4(),
                description: task,
                checked: false,
            };

            const updatedTasks = [...listTaks, newTask];
            setListTaks(updatedTasks);
            setTask('');
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } else {
            console.log("ERRO AQUI KRAI");
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
        <main className='max-w-lg mx-auto'>
            <header className="flex flex-col items-center justify-center text-center mb-4">
                <h1 className="text-6xl font-bold mb-0">MY<span className="text-blue-500">DO</span></h1>
                <p className="text-xl font-light mb-5">Lista de tarefas utilizando <span className="text-blue-900 font-bold">HTML</span>, <span className="text-blue-900 font-bold">CSS</span>, <span className="text-blue-900 font-bold">JavaScript</span> & <span className="text-blue-900 font-bold">Bootstrap 5</span> 😎📋</p>
                <div className="input-container flex w-full">
                    <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="📎 Novo Item..." className="block w-full rounded-lg rounded-r-none p-4 ring-2 ring-inset ring-slate-200 focus:ring-blue-400 outline-none" />
                    <button onClick={addTask} className="button w-14 rounded-lg rounded-l-none border-l-0 border-2 ring-slate-200 bg-slate-100 hover:bg-slate-200">+</button>
                </div>
            </header>

            <section className='mb-4' style={{ height: "calc(58px * 4 + 35px)", }}>
                {loading ? <Loading/> : listTaks.length > 0 ? <TaskList value={listTaks} onRemoveTask={removeTask} onToggleTask={toggleTask} /> : <EmptyData/>}
            </section>

            <footer className="text-center">
                <p className="font-mono mb-0">Feito com 💙 por <a href="https://www.linkedin.com/in/paulohenrique001" target="_blank" className="no-underline font-bold">Paulo Henrique</a></p>
                <p className="font-mono mb-0">Atividades de Extensão <a href="https://www.cruzeirodosulvirtual.com.br" target="_blank" className="no-underline font-bold">Cruzeiro do Sul</a> 🚀 2024</p>
            </footer>
        </main>
    );
};

export default Home;
