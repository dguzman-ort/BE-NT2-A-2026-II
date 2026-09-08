const Task = ({ task, handleUpdateTask, deleteTask }) => {
    const handleChangeCompleted = (e) => {
        const updatedTask = {
            ...task,
            completed: e.target.checked
        }
        handleUpdateTask(task.id, updatedTask);
    }

    return (
        <li
            className="task-item group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface-900/60 border border-slate-800/90 hover:border-slate-700/80 hover:bg-surface-850/70 transition-all duration-150 backdrop-blur-sm"
            data-completed="false"
            data-id="task-1"
            style={{ display: 'flex' }}
        >
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <label className="relative flex items-center justify-center cursor-pointer select-none">
                    <input className="task-checkbox peer sr-only" type="checkbox" checked={task.completed} onChange={handleChangeCompleted} />
                    <div className="w-5 h-5 rounded-md border-2 border-slate-600 bg-surface-950 peer-checked:border-indigo-500 peer-checked:bg-indigo-600 flex items-center justify-center transition-all">
                        <svg
                            className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                </label>
                <div className="flex flex-col min-w-0">
                    <span className="task-title text-sm font-medium text-slate-200 truncate transition-all">
                        {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.2 rounded border border-indigo-500/20">
                            {task.category}
                        </span>
                        <span className="text-[11px] text-slate-500">
                            • {task.completed ? 'Completado' : 'Pendiente'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1.5 ml-3">
                <button
                    className="delete-task-btn px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center gap-1.5 group/btn"
                    title="Borrar tarea"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                >
                    <svg
                        className="w-3.5 h-3.5 text-rose-400 group-hover/btn:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        ></path>
                    </svg>
                    <span className="hidden sm:inline font-normal">Borrar</span>
                </button>
            </div>
        </li>
    )
}

export default Task;