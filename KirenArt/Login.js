const modalOverlay = document.getElementById('modalOverlay');
        const closeModalBtn = document.getElementById('closeModal');
        const openModalBtn = document.getElementById('openModal');
        const loginForm = document.getElementById('loginForm');

        // Cerrar modal
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });

        // Abrir modal (con el botón de prueba)
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('hidden');
        });

        // Prevenir envío por defecto del formulario de ejemplo
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulario enviado correctamente (Simulación)');
        });