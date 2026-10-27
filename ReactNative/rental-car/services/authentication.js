const login = async (email, password) => {
    // const response = await fetch('https://api.example.com/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    // });
    // return response.json();
    console.log('autenticando...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldAuthenticate = email.trim() === 'admin@admin.com' && password.trim() === '123456';
            if (shouldAuthenticate) {
                resolve({
                    accessToken: '1234567890',
                    refreshToken: '1234567890',
                    expiresIn: 1000 * 60 * 60 * 24 * 30,
                    user: {
                        id: 1,
                        name: 'Admin',
                        email: 'admin@admin.com',
                    },
                });
            } else {
                reject({
                    error: 'Credenciales incorrectas',
                    status: 401,
                });
            }
            
        }, 1000);
    });
}

export { login };