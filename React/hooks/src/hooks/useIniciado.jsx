import { useState, useContext } from 'react'
import GlobalContext from './globalContext'

export const IniciadoProvider = ({ children }) => {

    const [isRunning, setIsRunning] = useState(false)

    const handleIsRunningChange = () => {
      setIsRunning(!isRunning)
    }
  
    const handleCountReset = () => {
      console.log('resetear contador')
      //setIsRunning(false)
      //TODO: resetear el contador
      //setCount(0)
    }
    

    return (
        <GlobalContext.Provider value={{ isRunning, handleIsRunningChange, handleCountReset  }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useIniciado = () => {
    const estaIniciado = useContext(GlobalContext)

    if (!estaIniciado) {
        throw new Error('useIniciado debe ser usado dentro de un IniciadoProvider')
    }

    return estaIniciado
}