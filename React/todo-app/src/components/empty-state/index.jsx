const EmptyState = () => {
    return (

        <div
            className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-800 rounded-2xl bg-surface-900/30"
            id="empty-state"
        >
            <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                    ></path>
                </svg>
            </div>
            <h4 className="text-sm font-semibold text-slate-300">
                No hay tareas aquí
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
                Agrega una nueva tarea en el campo superior o cambia el filtro
                actual.
            </p>
        </div>
    )
}

export default EmptyState;