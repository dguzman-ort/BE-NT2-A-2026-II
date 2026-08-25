const o1 = {
    a: 'a',
    b: 'b',
    c: function (){
        console.log('hola')
    },
    obj: {
        key: 'key'
    }
}

console.log(o1, typeof o1);

const o2 = o1; // referencia

console.log(o1, o2); 

o2.a = 'z'; // mutacion

console.log(o1, o2)

const o3 = Object.assign({}, o1); // copia

console.log(o1, o3);

o3.a = 'new value'
console.log(o1, o3);

o3.obj.key = 'new key';
console.log(o1, o3);

