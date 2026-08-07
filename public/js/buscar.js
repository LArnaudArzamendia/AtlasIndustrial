document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear el contenedor del mensaje "Sin resultados" de forma dinámica si no existe
    const menuContainer = document.querySelector('.menu-container');
    let mensajeNoResultados = document.getElementById('no-results-message');

    if (menuContainer && !mensajeNoResultados) {
        mensajeNoResultados = document.createElement('div');
        mensajeNoResultados.id = 'no-results-message';
        mensajeNoResultados.className = 'no-results-box';
        mensajeNoResultados.innerHTML = `
            <div class="no-results-content">
                <span class="no-results-icon">🔍❌</span>
                <h3>No se encontraron productos</h3>
                <p>Intenta buscando con palabras clave diferentes o revisa la ortografía.</p>
            </div>
        `;
        // Lo dejamos oculto por defecto al iniciar la página
        mensajeNoResultados.style.display = 'none';
        menuContainer.appendChild(mensajeNoResultados);
    }

    // 2. Escuchar cuando el usuario escribe en el buscador
    window.addEventListener('buscarProducto', (e) => {
        const textoBusqueda = e.detail.texto.toLowerCase().trim();
        const tarjetas = document.querySelectorAll('.product-card');
        const secciones = document.querySelectorAll('.category-section');

        if (tarjetas.length === 0) return; // Si no estamos en la página de pedidos, no hace nada

        let totalProductosVisibles = 0;

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector('.product-name').textContent.toLowerCase();
            const descripcion = tarjeta.querySelector('.product-desc').textContent.toLowerCase();

            // Si el texto coincide con el nombre o la descripción, se muestra
            if (nombre.includes(textoBusqueda) || descripcion.includes(textoBusqueda)) {
                tarjeta.style.display = 'flex';
                totalProductosVisibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        // 3. Controlar la visibilidad de las secciones/categorías completas
        secciones.forEach(seccion => {
            const tarjetasVisibles = [...seccion.querySelectorAll('.product-card')].filter(card => card.style.display !== 'none');
            
            if (textoBusqueda === '') {
                seccion.style.display = 'block';
                return;
            }

            if (tarjetasVisibles.length === 0) {
                seccion.style.display = 'none';
            } else {
                seccion.style.display = 'block';
            }
        });

        // 4. Mostrar u ocultar el cartel de "Sin resultados" basado en el conteo total
        if (totalProductosVisibles === 0 && textoBusqueda !== '') {
            if (mensajeNoResultados) mensajeNoResultados.style.display = 'block';
        } else {
            if (mensajeNoResultados) mensajeNoResultados.style.display = 'none';
        }
    });
});