document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Agregar un evento de escucha para el envío del formulario
    loginForm.addEventListener('submit', async (event) => {
        // Prevenir el comportamiento predeterminado del formulario
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Objeto con las credenciales del usuario
        const credentials = {
            nombre_usuario: username,
            contrasenia: password
        };

        try {
            // Enviar la solicitud POST a la ruta de inicio de sesión en tu servidor
            const response = await fetch('http://Integradorahugoback-env.eba-3p3cvtjy.us-east-1.elasticbeanstalk.com/api/auth/signin', {
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
                // Mostrar mensaje de inicio de sesión exitoso con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de sesión exitosa!',
                    showConfirmButton: false, // Sin botón de confirmación
                    timer: 1800 // Se cerrará automáticamente después de 5 segundos
                }).then(() => {
                    // Redirigir a index.html después de iniciar sesión exitosamente
                    window.location.href = '../../auth/principal.html';
                });
            } else if (response.status === 404) {
                throw new Error('Credenciales inválidas');
            } else {
                throw new Error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Mostrar mensaje de error con SweetAlert2
            await Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Por favor, intenta nuevamente.'
            });
        }
    });
});
