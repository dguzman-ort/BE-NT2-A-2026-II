import { personas, EDAD_MINIMA_CASINO } from './personas';

// Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

/**
 * CONSIGNA: Realizar una funcion que dado un array de objetos `personas`,
 * devuelva un array con un atributo `permitir_acceso` (_booleano_) que indique si la persona puede entrar al casino.
 * 
 * [
 *      {
 *          nombre: 'Juan',
 *          apellido: 'Perez',
 *          edad: 25,
 *          telefono: '2345678901',
 *          permitir_acceso: true
 *      },
 * ]
 */

const  listadoCurado = (listaPersonas) => {
    return listaPersonas.map((persona) => {
        
        const permitir_acceso = persona.edad >= EDAD_MINIMA_CASINO;
        //console.log('persona', persona, permitir_acceso);
        
        return {
            ...persona,
            // permitir_acceso: permitir_acceso //(exactamente igual)
            permitir_acceso //(no es necesario el : permitir_acceso)
        }

    })
}

const listadoFinal = listadoCurado(personas);

console.log('listadoFinal', listadoFinal);
console.log('listadoOriginal', personas);