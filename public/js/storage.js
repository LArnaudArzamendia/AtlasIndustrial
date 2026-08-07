/**
 * ============================================================
 * storage.js
 * ------------------------------------------------------------
 * Gestiona toda la persistencia de datos de la aplicación.
 * Ningún otro archivo debería acceder directamente a localStorage.
 * ============================================================
 */

const Storage = (() => {
    // Claves utilizadas en localStorage
    const KEYS = {
        carrito: 'atlas_carrito'
    };

    /**
     * Guarda el carrito.
     * @param {Array} carrito
     */
    function guardarCarrito(carrito) {
        localStorage.setItem(KEYS.carrito, JSON.stringify(carrito));
    }

    /**
     * Obtiene el carrito.
     * @returns {Array}
     */
    function cargarCarrito() {
        try {
            const datos = localStorage.getItem(KEYS.carrito);
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error('Error cargando carrito:', error);
            return [];
        }
    }

    /**
     * Elimina el carrito.
     */
    function limpiarCarrito() {
        localStorage.removeItem(KEYS.carrito);
    }

    /**
     * Borra absolutamente todos los datos
     * utilizados por Atlas Industrial.
     */
    function limpiarTodo() {
        Object.values(KEYS).forEach(clave => {
            localStorage.removeItem(clave);
        });
    }

    return {
        guardarCarrito,
        cargarCarrito,
        limpiarCarrito,

        limpiarTodo
    };
})();