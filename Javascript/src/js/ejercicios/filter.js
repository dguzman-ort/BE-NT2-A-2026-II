import { personas, EDAD_MINIMA_CASINO } from './personas';

/**
 * CONSIGNA: realizar una funcion que dado un array de objetos personas,
 * devuelva un nuevo array solamente con las perosnas que puedan entrar a un casino
 * 
 * [
 *      {
 *          nombre: 'Juan',
 *          apellido: 'Perez',
 *          edad: 25,
 *          telefono: '2345678901'
 *      },
 * ]
 */

const validarEdad = (persona) => persona.edad >= EDAD_MINIMA_CASINO;


const personasMayores = (listaPersonas) => {
    const personasMayores = [];
    for (const persona of listaPersonas) {
        console.log(persona);
        if (validarEdad(persona)) {
            personasMayores.push(persona);
        }
    }

    return personasMayores;
}


const listaFinal = personasMayores(personas);

console.log('listaFinal', listaFinal);

console.log('______________________________________');

const personasMayores2 = (listaPersonas) => listaPersonas.filter(validarEdad);
const listaFinal2 = personasMayores2(personas);
console.log('listaFinal2', listaFinal2);