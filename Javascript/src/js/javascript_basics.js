const x = 17;

console.log(x, typeof x);

const explicito = String(x);
console.log(explicito, typeof explicito);

const implicito = x + '';
console.log(implicito, typeof implicito);

const booleano = Boolean(x);
console.log(booleano, typeof booleano);

console.log('x == explicito', x == explicito);
console.log('x === explicito', x === explicito);