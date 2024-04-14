document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            nombre_usuario: document.getElementById('username').value,
            contrasenia: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Mostrar mensaje de éxito
                window.location.href = '../index.html'; // Redirigir a index.html
            } else {
                alert(data.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error interno del servidor');
        }
    });
});
