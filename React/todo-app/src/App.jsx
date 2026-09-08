import { useState } from 'react';

/**
 * Components
 */
import Task from './components/Task';
import Counters from './components/Counters';
import Form from './components/Form';
import EmptyState from './components/empty-state';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = (task) => {
    setTasks([...tasks, task]);
  }

  const updateTask = (id, updatedTask) => {
    const newTasks = tasks.map(task => task.id === id ? updatedTask : task);
    setTasks(newTasks);
  }

  const deleteTask = (id) => {
    console.log('delete task', id);
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }



  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-indigo-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[400px] bg-violet-600/10 blur-[140px] rounded-full"></div>
      </div>

      <header
        className="relative z-10 border-b border-slate-800/80 bg-surface-900/60 backdrop-blur-xl sticky top-0"
        data-purpose="app-header"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.5 12.75l6 6 9-13.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="flex items-baseline gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                TODO App
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  Pro
                </span>
              </h1>
            </div>
          </div>

        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* Component Counters (agregado) */}
        <Counters tasks={tasks} />

        {/* Form nueva tarea */}
        <Form handleNewTask={handleNewTask} />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-200 tracking-wide">
              Todas las tareas
            </h2>
            <span
              className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 font-mono"
              id="badge-all"
            >
              {tasks.length}
            </span>
          </div>
        </div>

        <section
          className="flex flex-col gap-2.5 min-h-[220px]"
          data-purpose="task-list-section"
        >
          <ul className="flex flex-col gap-2.5" id="task-items-container">


            {tasks.length > 0 && tasks.map((task) => {
              return (
                <Task key={task.id} task={task} handleUpdateTask={updateTask} deleteTask={deleteTask} />
              )
            })
            }

          </ul>

          {tasks.length === 0 && <EmptyState />}

        </section>
      </main>

      <footer
        className="border-t border-slate-900/80 py-6 text-center text-xs text-slate-500 mt-auto"
        data-purpose="app-footer"
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Modo Local — Listo para usar</span>
          </div>
          <p className="text-slate-600">
            TODO App © Rediseño Moderno en Español
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
