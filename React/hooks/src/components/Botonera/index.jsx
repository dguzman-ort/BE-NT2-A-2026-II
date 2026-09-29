import { useIniciado } from '../../hooks/useIniciado'

const Botonera = () => {

    const { isRunning, handleIsRunningChange, handleCountReset } = useIniciado()

    return (
        <div className="actions">
            <button className="btn" onClick={handleIsRunningChange}> {isRunning ? 'Detener' : 'Iniciar'}</button>
            <button className="btn" onClick={handleCountReset}>Resetear</button>
        </div>
    )
}

export default Botonera