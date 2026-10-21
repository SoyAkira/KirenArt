const slider = document.getElementById('galleryContainer');

// Duplicamos las imágenes para lograr el loop infinito perfecto
slider.innerHTML += slider.innerHTML;

let currentTranslate = 0;
let isDragging = false;
let startX = 0;
let animationId;
let speed = 0.8; // Velocidad del movimiento automático (ajústala a tu gusto)

// Función que mueve el carrusel de manera continua
function autoScroll() {
    if (!isDragging) {
        currentTranslate -= speed;
        
        // Obtenemos la mitad exacta del ancho total (ya que duplicamos los elementos)
        const totalWidth = slider.scrollWidth / 2;
        
        // Si llega a la mitad, reinicia la posición de forma invisible
        if (Math.abs(currentTranslate) >= totalWidth) {
            currentTranslate = 0;
        }
        
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
    animationId = requestAnimationFrame(autoScroll);
}

// Iniciar el movimiento automático
autoScroll();

// --- EVENTOS DE ARRASTRE (MOUSE Y TÁCTIL) ---

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - currentTranslate;
    slider.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    currentTranslate = currentX - startX;
    
    // Control de límites para el bucle manual
    const totalWidth = slider.scrollWidth / 2;
    if (currentTranslate > 0) {
        currentTranslate = -totalWidth + currentTranslate;
    } else if (Math.abs(currentTranslate) >= totalWidth) {
        currentTranslate = 0;
    }
    
    slider.style.transform = `translateX(${currentTranslate}px)`;
});



document.querySelectorAll('.hover-video').forEach(video => {
    const card = video.parentElement;

    // Cuando el cursor entra a la tarjeta del video
    card.addEventListener('mouseenter', () => {
        video.play().catch(error => {
            // Previene errores de políticas del navegador si llegara a fallar
            console.log("Reproducción automática bloqueada por el navegador:", error);
        });
    });

    // Cuando el cursor sale de la tarjeta del video
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // (Opcional) Si quieres que se reinicie al quitar el mouse
    });
});



const stepItems = document.querySelectorAll('.step-item');
const images = document.querySelectorAll('.preview-img');

stepItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // 1. Remover la clase active de todos los pasos y añadirla al seleccionado
        stepItems.forEach(s => s.classList.remove('active'));
        item.classList.add('active');

        // 2. Alternar las imágenes de forma sincronizada con el paso actual
        images.forEach(img => img.classList.remove('active'));
        
        if (images[index]) {
            images[index].classList.add('active');
        }
    });
});



const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn.addEventListener('click', () => {
        // Cierra los demás abiertos (opcional, si prefieres que solo uno esté abierto a la vez)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Alterna el estado activo en el elemento actual
        item.classList.toggle('active');
    });
});