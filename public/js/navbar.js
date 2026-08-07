fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar navbar.html');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;

        // --- LÓGICA DE BÚSQUEDA EN TIEMPO REAL ---
        const inputBuscar = document.querySelector('.search-input');
        const botonBuscar = document.querySelector('.search-btn');

        function dispararBusqueda(texto) {
            const eventoBuscador = new CustomEvent('buscarProducto', {
                detail: { texto }
            });
            window.dispatchEvent(eventoBuscador);
        }

        function ejecutarBusqueda() {
            const texto = inputBuscar.value.trim();
            const enPaginaDeProductos = document.querySelector('.menu-container');

            if (enPaginaDeProductos) {
                // Ya estamos en pedir.html: solo filtramos en vivo
                dispararBusqueda(texto);
            } else if (texto !== '') {
                // Estamos en otra página: navegamos a pedir.html con la búsqueda
                window.location.href = `pedir.html?buscar=${encodeURIComponent(texto)}`;
            }
        }

        if (inputBuscar) {
            inputBuscar.addEventListener('input', (e) => {
                dispararBusqueda(e.target.value);
            });

            inputBuscar.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    ejecutarBusqueda();
                }
            });

            // Si llegamos desde otra página con ?buscar=..., precargamos el input
            const parametros = new URLSearchParams(window.location.search);
            const busquedaUrl = parametros.get('buscar');
            if (busquedaUrl) {
                inputBuscar.value = busquedaUrl;
                dispararBusqueda(busquedaUrl);
            }
        }

        if (botonBuscar) {
            botonBuscar.addEventListener('click', (e) => {
                e.preventDefault();
                ejecutarBusqueda();
            });
        }
    })
    .catch(error => {
        console.error(error);
    });