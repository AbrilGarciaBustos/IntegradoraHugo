document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto del formulario

        // Obtener valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellidoP = document.getElementById('apellidoP').value;
        const apellidoM = document.getElementById('apellidoM').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const username = document.getElementById('username').value;
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;

        // Objeto con los datos del nuevo usuario a registrar
        const newUser = {
            nombre,
            apellidoP,
            apellidoM,
            fecha_nacimiento: fechaNacimiento,
            nombre_usuario: username,
            correo,
            contrasenia: password
        };

        try {
            // Enviar datos al servidor usando fetch
            const response = await fetch('http://Integradorahugoback-env.eba-3p3cvtjy.us-east-1.elasticbeanstalk.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
                mode: 'cors', // Establecer el modo CORS en 'cors'
                credentials: 'same-origin' // Usar las credenciales de origen para la solicitud
            });

            if (response.ok) {
                const data = await response.json();
                // Mostrar mensaje de registro exitoso con SweetAlert2
                await Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1500 // Cerrar automáticamente después de 1.5 segundos
                });

                // Redirigir al usuario a otra página después de registrarse
                window.location.href = '../../auth/login.html'; // Cambiar a la página deseada
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            // Mostrar mensaje de error con SweetAlert2
            await Swal.fire({
                icon: 'error',
                title: 'Error al registrar usuario',
                text: 'Por favor, intenta nuevamente.'
            });
        }
    });
});
