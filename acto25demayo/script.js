document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Función para actualizar el estado de las diapositivas
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            }
        });
    }

    // Función para ocultar/mostrar las notas del orador
    function toggleNotas() {
        const notas = document.querySelectorAll('.notas');
        notas.forEach(nota => {
            nota.classList.toggle('hidden');
        });
    }

    // Escuchar eventos del teclado
    document.addEventListener('keydown', (e) => {
        const activeSlide = slides[currentSlide];

        // Flecha derecha o barra espaciadora para avanzar
        if (e.key === 'ArrowRight' || e.key === ' ') {
            
            // Buscar si hay conceptos ocultos en la diapo actual
            const hiddenConcepts = activeSlide.querySelectorAll('.concepto:not(.visible)');
            
            if (hiddenConcepts.length > 0) {
                // Si hay conceptos ocultos, mostramos el primero de la lista
                hiddenConcepts[0].classList.add('visible');
            } else {
                // Si ya no hay conceptos ocultos (o no hay conceptos en esta diapo), pasamos a la siguiente diapo
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    updateSlides();
                }
            }
        }
        // Flecha izquierda para retroceder
        else if (e.key === 'ArrowLeft') {
            
            // Buscar si hay conceptos visibles en la diapo actual
            const visibleConcepts = activeSlide.querySelectorAll('.concepto.visible');
            
            if (visibleConcepts.length > 0) {
                // Si hay conceptos visibles, ocultamos el último que apareció (hacemos marcha atrás)
                visibleConcepts[visibleConcepts.length - 1].classList.remove('visible');
            } else {
                // Si no hay conceptos visibles, volvemos a la diapo anterior
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlides();
                }
            }
        }
        // Tecla 'N' para alternar la visibilidad de las notas
        else if (e.key === 'n' || e.key === 'N') {
            toggleNotas();
        }
    });

    // Inicializar la primera diapositiva
    updateSlides();
});