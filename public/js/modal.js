/**
 * ============================================================
 * modal.js
 * ------------------------------------------------------------
 * Componente reutilizable de diálogos para Atlas Industrial.
 * ============================================================
 */

const Modal = (() => {
    let overlay = null;

    /**
     * Crea el modal la primera vez.
     */
    function crearModal() {
        if (overlay) return;

        overlay = document.createElement("div");
        overlay.id = "modal-overlay";

        overlay.innerHTML = `
            <div class="modal-window">

                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                </div>

                <div class="modal-body">
                    <p class="modal-message"></p>
                </div>

                <div class="modal-footer">

                    <button class="btn-modal btn-cancelar">
                        Cancelar
                    </button>

                    <button class="btn-modal btn-confirmar">
                        Aceptar
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                cerrar();
            }
        });
    }

    /**
     * Abre el modal.
     */
    function mostrar({
        titulo = "",
        mensaje = "",
        permitirHTML = false,
        textoConfirmar = "Aceptar",
        textoCancelar = "Cancelar",
        mostrarCancelar = true,
        onConfirm = null,
        onCancel = null
    }) {
        crearModal();

        const tituloModal = overlay.querySelector(".modal-title");
        const mensajeModal = overlay.querySelector(".modal-message");

        const btnConfirmar = overlay.querySelector(".btn-confirmar");
        const btnCancelar = overlay.querySelector(".btn-cancelar");

        tituloModal.textContent = titulo;

        if (permitirHTML) {
            mensajeModal.innerHTML = mensaje;
        } else {
            mensajeModal.textContent = mensaje;
        }

        btnConfirmar.textContent = textoConfirmar;

        btnCancelar.textContent = textoCancelar;

        btnCancelar.style.display = mostrarCancelar
            ? "inline-flex"
            : "none";

        btnConfirmar.onclick = () => {
            cerrar();

            if (typeof onConfirm === "function") {
                onConfirm();
            }
        };

        btnCancelar.onclick = () => {
            cerrar();

            if (typeof onCancel === "function") {
                onCancel();
            }
        };
        overlay.classList.add("show");
    }

    /**
     * Cierra el modal.
     */
    function cerrar() {
        if (!overlay) return;
        overlay.classList.remove("show");
    }

    /**
     * Modal tipo alerta.
     */
    function alerta({
        titulo = "",
        mensaje = "",
        permitirHTML = false,
        texto = "Aceptar",
        onClose = null
    }) {
        mostrar({
            titulo,
            mensaje,            
            permitirHTML,
            textoConfirmar: texto,
            mostrarCancelar: false,
            onConfirm: onClose
        });
    }

    /**
     * Modal tipo confirmación.
     */
    function confirmar({
        titulo,
        mensaje,
        permitirHTML = false,
        textoConfirmar = "Aceptar",
        textoCancelar = "Cancelar",

        onConfirm,
        onCancel
    }) {
        mostrar({
            titulo,
            mensaje,
            permitirHTML,
            textoConfirmar,
            textoCancelar,
            mostrarCancelar: true,
            onConfirm,
            onCancel
        });
    }

    return {
        mostrar,
        cerrar,
        alerta,
        confirmar
    };
})();