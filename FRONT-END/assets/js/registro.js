document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidoP = document.getElementById('apellidoP').value;
    const apellidoM = document.getElementById('apellidoM').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const username = document.getElementById('username').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    // Crear objeto con los datos del usuario
    const userData = {
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        fecha_nacimiento: fechaNacimiento,
        nombre_usuario: username,
        correo: correo,
        contrasenia: password
    };

    // Ejemplo de cómo enviar los datos del usuario a través de una solicitud fetch
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registro exitoso:', data);
        // Aquí puedes redirigir al usuario a la página de inicio de sesión u otra página
    })
    .catch(error => {
        console.error('Error en el registro:', error);
    });
});
