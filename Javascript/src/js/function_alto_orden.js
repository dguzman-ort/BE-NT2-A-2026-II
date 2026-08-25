const miFuncion = (function() {
    const mensaje = 'Hola mundo';
    console.log(mensaje);

    function saludando(){
        console.log(`${mensaje} desde la funcion saludando`);
    }
    return saludando;
})();

console.log(typeof miFuncion);

miFuncion();
// console.log(valor, typeof valor);

//console.log(mensaje)


console.log('______________________________________');

const counter = (function () {
    let count = 0;

    console.log('-- Inicializando objeto counter --');

    function show() {
        console.log(count)
    }
    function get(){
        return count;
    }

    const increment = function(){
        count = count + 1;
    }

    const decrement = () => {
        count--;
    }

    return { show, get, increment, decrement};

})()

console.log('counter', counter);

console.log(counter.get());

// console.log(count) // descomentar para ver el error

counter.show(); // 0
counter.increment();
counter.increment();
counter.increment();
counter.show(); // 3
counter.decrement();
counter.show(); // 2