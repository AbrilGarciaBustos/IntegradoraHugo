// fileRoutes.js

// Función para subir archivo
document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('archivo', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3001/api/file/subir', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Mensaje de éxito del servidor
            // Aquí puedes actualizar la interfaz o mostrar una notificación de éxito
        } else {
            throw new Error('Error al subir archivo');
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
        // Manejo de errores: mostrar mensaje al usuario o realizar acciones necesarias
    }
});

// Función para eliminar un archivo por su ID
async function eliminarArchivo(archivoId) {
    try {
        const response = await fetch(`http://localhost:3001/api/file/eliminar/${archivoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Mensaje de éxito del servidor
            // Aquí puedes actualizar la interfaz o mostrar una notificación de éxito
        } else {
            throw new Error('Error al eliminar archivo');
        }
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        // Manejo de errores: mostrar mensaje al usuario o realizar acciones necesarias
    }
}

// Función para descargar un archivo por su ID
async function descargarArchivo(archivoId) {
    try {
        const response = await fetch(`http://localhost:3001/api/file/descargar/${archivoId}`);

        if (response.ok) {
            // Descarga el archivo en el navegador
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `archivo_${archivoId}.pdf`; // Nombre de archivo sugerido
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            throw new Error('Error al descargar archivo');
        }
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        // Manejo de errores: mostrar mensaje al usuario o realizar acciones necesarias
    }
}