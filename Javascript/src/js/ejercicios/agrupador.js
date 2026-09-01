import { personas } from './personas';

/**
 * CONSIGNA FINAL: Dada una lista de personas, crear una funcion que agrupe las personas segun la primera letra de su nombre (nombre completo).
 * El resultado esperado es una estructura de datos de la siguiente manera:
 * 
 * {
 *      'A': [
 *          {
 *              nombre: 'Ana',
 *              apellido: 'Lopez',
 *              edad: 25,
 *              telefono: '2345678904'
 *          }
 *      ],
 *      'C': [
 *          {
 *              nombre: 'Carlos',
 *              apellido: 'Garcia',
 *              edad: 30,
 *              telefono: '2345678905'
 *          }
 *      ],
 *      ...,
 *      'O': [...],
 *      'P': [...]
 * }
 */

const agruparPersonas = (listaPersonas) => {
    return listaPersonas.reduce(
        (grupo, persona) => {
            const letra = persona.nombre[0].toUpperCase();
            console.log('letra', letra);

            //const existeLetra = grupo[letra];
            
            // if (existeLetra) {
            //     grupo[letra].push(persona);
            // }else{
            //     grupo[letra] = [persona];
            // }

            // if (!(letra in grupo)) {
            //     grupo[letra] = [];
            // }
            // grupo[letra].push(persona);
            

            return {
                ...grupo,
                [letra]: [...(grupo[letra] || []), persona]
            }
        },
        {}
    )
}

const resultado = agruparPersonas(personas);
console.log('resultado', resultado);