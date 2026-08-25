function obtenerUsuarioBD(callback){
    // Simula una llamda a una API para obtener un usuario de la BD. 

    const usuario = {
        id: 1,
        nombre: 'Juan',
        email: 'juan@example.com',
        edad: 17
    }
    // console.log('Iniciando la llamada a la API...')
    setTimeout(() => {
        callback(usuario);
    }, 3000);
    // console.log('Llamada a la API completada');
}

function saludoUsuario(user){
    console.log(`Hola ${user.nombre}, bienvenido al sistema`);
}

function validaEdad(user){
    if(user.edad >= 18){
        console.log(`${user.nombre} es mayor de edad, puede ingresar al sistema`);
    } else {
        console.warn(`${user.nombre} es menor de edad`);
    }
}

console.log(typeof obtenerUsuarioBD);

obtenerUsuarioBD(saludoUsuario);

obtenerUsuarioBD(console.log);

obtenerUsuarioBD(validaEdad);