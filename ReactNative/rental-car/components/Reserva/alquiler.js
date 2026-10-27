/** @typedef {'recogida' | 'devolucion'} Campo */
/** @typedef {Readonly<{ recogida: number, devolucion: number }>} Intervalo */
/** @typedef {{ tipo: 'ok', intervalo: Intervalo } | { tipo: 'rechazado', motivo: 'devolucion-no-posterior' }} Edicion */

export const TARIFAS = Object.freeze({
    coberturaCompletaDia: 45,
    tasasAeropuerto: 65,
    deposito: 300,
});

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const MS_DIA = 24 * 60 * 60 * 1000;

function congelar(recogida, devolucion) {
    return Object.freeze({ recogida, devolucion });
}

export function intervaloInicial(ahora) {
    const recogida = new Date(ahora);
    recogida.setHours(10, 0, 0, 0);
    const devolucion = new Date(recogida.getTime());
    devolucion.setDate(devolucion.getDate() + 3);
    return congelar(recogida.getTime(), devolucion.getTime());
}

export function editarIntervalo(intervalo, campo, instante) {
    switch (campo) {
        case 'recogida': {
            if (instante < intervalo.devolucion) {
                return Object.freeze({
                    tipo: 'ok',
                    intervalo: congelar(instante, intervalo.devolucion),
                });
            }
            const duracion = intervalo.devolucion - intervalo.recogida;
            return Object.freeze({
                tipo: 'ok',
                intervalo: congelar(instante, instante + duracion),
            });
        }
        case 'devolucion': {
            if (instante <= intervalo.recogida) {
                return Object.freeze({
                    tipo: 'rechazado',
                    motivo: 'devolucion-no-posterior',
                });
            }
            return Object.freeze({
                tipo: 'ok',
                intervalo: congelar(intervalo.recogida, instante),
            });
        }
        default: {
            const _exhaustive = campo;
            throw new Error(_exhaustive);
        }
    }
}

export function diasDeAlquiler(intervalo) {
    const recogida = new Date(intervalo.recogida);
    const devolucion = new Date(intervalo.devolucion);
    const inicio = Date.UTC(recogida.getFullYear(), recogida.getMonth(), recogida.getDate());
    const fin = Date.UTC(devolucion.getFullYear(), devolucion.getMonth(), devolucion.getDate());
    const civiles = Math.round((fin - inicio) / MS_DIA);
    const minutosRecogida = recogida.getHours() * 60 + recogida.getMinutes();
    const minutosDevolucion = devolucion.getHours() * 60 + devolucion.getMinutes();
    const extra = minutosDevolucion > minutosRecogida ? 1 : 0;
    return Math.max(1, civiles + extra);
}

export function etiqueta(instante) {
    const fecha = new Date(instante);
    const horas24 = fecha.getHours();
    const sufijo = horas24 >= 12 ? 'PM' : 'AM';
    const hora12 = horas24 % 12 || 12;
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return {
        dia: `${DIAS[fecha.getDay()]} ${fecha.getDate()} ${MESES[fecha.getMonth()]}`,
        hora: `${hora12}:${minutos} ${sufijo}`,
        fecha: fecha.toISOString(),
    };
}

export function cotizar(dias, precioDia) {
    const base = dias * precioDia;
    const cobertura = dias * TARIFAS.coberturaCompletaDia;
    const tasas = TARIFAS.tasasAeropuerto;
    return {
        base,
        cobertura,
        tasas,
        total: base + cobertura + tasas,
    };
}

export function combinar(dia, reloj) {
    const fecha = new Date(dia);
    const hora = new Date(reloj);
    return new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        hora.getHours(),
        hora.getMinutes(),
        0,
        0,
    ).getTime();
}
