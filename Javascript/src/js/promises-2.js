(async ()=>{
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

    const obtenerPosts = () => {
        return new Promise((resolve, reject) => {
            console.log('Iniciando la peticion a la API');
            setTimeout(() => {
                fetch(API_URL)
                .then(response => {
                    if (response.ok){
                        return response.json();
                    }else {
                        throw new Error('Error al obtener los posts');
                    }
                })
                .then(data =>{
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })   
            }, 3000);
            
        })
    }
    
    /** Asincrono */
    // const posts = obtenerPosts();
    
    // console.log('Posts', posts);
    
    // posts.then(data => {
    //     console.log('posts obtenidos', data);
    // }).catch(error => {
    //     console.error('error al obtener los posts', error);
    // });
    
    // console.log('Continua el codigo');
    
    /** Sincrono */

    const posts = await obtenerPosts();
    console.log('posts obtenidos', posts);

})();




