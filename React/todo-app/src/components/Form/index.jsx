import { useState } from 'react';

const QuickAddTask = ({ handleNewTask }) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    }


    const handleAddTask = () => {
        if (title.trim() === '') return;
        if (category.trim() === '') return;

        const newTask = {
            id: Date.now(),
            title,
            category,
            completed: false
        }
        
        handleNewTask(newTask);

        setTitle('');
        setCategory('General');
    }

    return (
        <section
            className="bg-surface-900/90 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 shadow-xl glow-soft backdrop-blur-md"
            data-purpose="task-input-section"
        >
            <form
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
                id="todo-form"
            >
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 4v16m8-8H4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                    <input
                        autoComplete="off"
                        className="w-full pl-11 pr-4 py-3 bg-surface-950/70 text-slate-100 placeholder-slate-500 text-sm rounded-xl border border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                        id="new-task-input"
                        placeholder="Nueva tarea..."
                        type="text"
                        value={title}
                        onChange={handleChangeTitle}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="bg-surface-950/70 border border-slate-700/60 text-slate-300 text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-full cursor-pointer"
                        id="task-category-select"
                        value={category}
                        onChange={handleChangeCategory}
                    >
                        <option value="General">🏷️ General</option>
                        <option value="Hogar">🏠 Hogar</option>
                        <option value="Estudio">📚 Estudio</option>
                        <option value="Trabajo">💼 Trabajo</option>
                    </select>
                    <button
                        className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 whitespace-nowrap cursor-pointer hover:shadow-indigo-500/40 glow-indigo"
                        id="add-task-btn"
                        type="button"
                        onClick={handleAddTask}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 4v16m8-8H4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                            ></path>
                        </svg>
                        <span>Agregar</span>
                    </button>
                </div>
            </form>
        </section>
    )
}

export default QuickAddTask;