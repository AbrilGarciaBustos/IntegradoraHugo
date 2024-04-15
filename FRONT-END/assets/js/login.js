document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Agregar un evento de escucha para el envío del formulario
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Objeto con las credenciales del usuario
        const credentials = {
            nombre_usuario: username,
            contrasenia: password
        };

        try {
            // Enviar la solicitud POST a la ruta de inicio de sesión en tu servidor
            const response = await fetch('http://localhost:3001/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                mode: 'cors', // Establecer el modo CORS en 'cors'
                credentials: 'same-origin' // Usar las credenciales de origen para la solicitud
            });

            // Verificar el código de estado de la respuesta
            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Mostrar mensaje de inicio de sesión exitoso

                // Redirigir a index.html después de iniciar sesión exitosamente
                window.location.href = '../../auth/index.html';
            } else if (response.status === 404) {
                throw new Error('Credenciales inválidas');
            } else {
                throw new Error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
        }
    });
});
