const Counters = ({ tasks }) => {

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter((task) => !task.completed).length;
    // const pendingTasks = tasks.reduce((acc, task) => {
    //     if (!task.completed) {
    //         acc++;
    //     }
    //     return acc;
    // }, 0);

    return (
        <section
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
            data-purpose="metrics-dashboard"
        >
            <div className="p-4 rounded-2xl bg-surface-900/70 border border-slate-800/90 backdrop-blur-md flex items-center justify-between group hover:border-slate-700/80 transition-all duration-200">
                <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Total
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span
                            className="text-2xl font-bold text-white tracking-tight"
                            id="stat-total"
                        >
                            {totalTasks}
                        </span>
                        <span className="text-xs text-slate-500 font-normal">
                            tareas
                        </span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-900/70 border border-amber-500/20 backdrop-blur-md flex items-center justify-between group hover:border-amber-500/40 transition-all duration-200">
                <div>
                    <p className="text-xs font-medium text-amber-400/90 uppercase tracking-wider">
                        Pendientes
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span
                            className="text-2xl font-bold text-amber-400 tracking-tight"
                            id="stat-pending"
                        >
                            {pendingTasks}
                        </span>
                        <span className="text-xs text-slate-500 font-normal">
                            por hacer
                        </span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        ></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default Counters;