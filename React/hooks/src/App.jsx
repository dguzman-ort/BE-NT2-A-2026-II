import './App.css'
import Contador from './components/Contador'
import Botonera from './components/Botonera'
import { IniciadoProvider } from './hooks/useIniciado'

function App() {


  // const [nombre, setNombre] = useState('')


  // useEffect(() => {
  //   console.log('1. componente montado')
  //   return () => {
  //     console.log('2. componente desmontado')
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('3. nombre cambió a:', nombre)
  // }, [nombre])

  // const handleNombreChange = () => {
  //   const nuevoNombre = prompt('Enter your name')
  //   setNombre(nuevoNombre)
  // }



  return (
    <IniciadoProvider>
      <section id="next-steps">
        <div className="container">
          <Contador />
          <Botonera />
        </div>
      </section>
    </IniciadoProvider>
  )
}

export default App
