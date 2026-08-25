/**
 * Javascript Object Notation: JSON
 */

function MiSaludo(){
    console.log(typeof this);
    if(this === undefined){
        console.log('Hola mundo, soy undefined');
    }else{
        console.log('Hola mundo, soy ' + this.nombre + ' ' + this.apellido);
    }
}

const o = new Object();

console.log('Hola, este es un objeto:', o);

o.nombre = "Juan";
o.apellido = 'Perez';
o.activo = true;
o.edad = 20;
o.club = ['Boca', 'River', `San Lorenzo`];
o.saludo = MiSaludo;

console.log(o, typeof o);

o.saludo(); // this es igual a o

MiSaludo(); // this es igual a undefined

console.log('______________________________________');



const o1 = {};

const key = 'edad';
const value = 33;

console.log(o1, typeof o1);
o1[key] = value;
console.log('Mi edad es ' + o1[key]);


console.log('______________________________________');

const o2 = {
    nombre: 'Daniel',
    apellido: 'Guzman',
    activo: true,
    edad: 35,
    profesion: 'Software Engineer',
    educacion: [
        {
            titulo: 'Bs Computer engineering',
            anio: 2013
        },
        {
            titulo: 'Ms Computer science',
            anio: 2019
        }
    ]
};

console.log(o2, typeof o2);
