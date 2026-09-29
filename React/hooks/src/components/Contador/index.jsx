import { useState, useEffect, useRef } from 'react'
import { useIniciado } from '../../hooks/useIniciado'

const Contador = () => {

    const { isRunning } = useIniciado()
    const interval = useRef(null)

  useEffect(() => {
    // console.log('interval', interval.current)
    if (isRunning) {
      console.log('contador iniciado')
      interval.current = setInterval(() => {
        //console.log('contador incrementado', count)
        setCount((prev) => {
          return prev + 1
        })
      }, 1000)
    }else {
      console.log('contador detenido')
      clearInterval(interval.current)
    }
  }, [isRunning])

    const [count, setCount] = useState(0)
    return (
        <div>
            <p className="counter">Contador: {count}</p>
        </div>
    )
}

export default Contador