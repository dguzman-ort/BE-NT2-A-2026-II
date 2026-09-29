const promesa = fetch('https://jsonplaceholder.typicode.com/posts/1');

console.log('promesa', promesa);

promesa.then(res => {
    console.log('Se completo la promesa');
})

promesa.then(res=>{
    console.log('res', res);
    return res.json();
}).then(data => {
    console.log('data', data);
})

promesa.catch((error) => {
    console.warn('NO se completo la promesa');
    console.error('error detectado', error);
});

promesa.finally(() => {
    console.log('No importa el resultado, se ejecuto finally');
});