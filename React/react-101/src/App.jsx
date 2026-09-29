import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Saludo from './components/Saludo'

function App() {
  const [nombre, setNombre] = useState('')


  const cambiarNombre = () => {
    const nuevoNombre = prompt('Ingrese el nuevo nombre')
    console.log(nuevoNombre)
    if (nuevoNombre) {
      setNombre(nuevoNombre)
    }
  }
  return (
    <>
      <section id="center">
        <Saludo nombre={nombre}/>
        <div>
          <h1>Hola Equipo PNT2</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Saludo />
        <Saludo />

        
      </section>

      <button className='counter' onClick={cambiarNombre}>Cambiar nombre</button>

      <div className="ticks"></div>
    </>
  )
}

export default App
