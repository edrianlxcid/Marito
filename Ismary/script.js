document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a los elementos del DOM ---
    const questionButton = document.getElementById('questionButton'); // Botón "¿Quieres ser mi novia?"
    const yesButton = document.getElementById('yesButton');         // Nuevo botón "¡Sí!"
    const responseMessage = document.getElementById('responseMessage'); // Mensaje de respuesta

    // --- Lógica del Carrusel de Imágenes ---
    const imageCarousel = document.getElementById('imageCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = imageCarousel.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    function showSlide(index) {
        imageCarousel.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showSlide(currentIndex);
    });

    // Opcional: Auto-play del carrusel (descomentar para activarlo)
    // setInterval(() => {
    //     nextBtn.click();
    // }, 4000);

    // --- Lógica de la Propuesta de Noviazgo (Actualizada) ---

    // 1. Cuando se hace clic en el botón de pregunta principal:
    questionButton.addEventListener('click', () => {
        questionButton.style.display = 'none'; // Oculta el botón de pregunta
        
        // Muestra el botón "¡Sí!"
        yesButton.classList.remove('hidden'); // Remueve la clase 'hidden' para que 'display: none;' ya no aplique
        
        // Aplica la animación de aparición para el botón "¡Sí!"
        // Un pequeño retraso para que la transición se active correctamente después de 'display: block'
        setTimeout(() => {
            yesButton.style.opacity = '1';
            yesButton.style.transform = 'translateY(0)';
        }, 10); 
    });

    // 2. Cuando se hace clic en el botón "¡Sí!":
    yesButton.addEventListener('click', () => {
        yesButton.style.display = 'none'; // Oculta el botón "¡Sí!" después de clickearlo
        responseMessage.textContent = "El no, no era una opcion. Te amo bb ❤️";
        responseMessage.classList.remove('hidden'); // Muestra el mensaje de respuesta
        
        createHearts(); // Llama a la animación de corazones
    });

    // --- Lógica para los Corazones (¡ACTUALIZADA para caer más abajo!) ---
    function createHearts() {
        const body = document.body;
        for (let i = 0; i < 30; i++) { 
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw'; 
            heart.style.top = `${-50 - Math.random() * 100}px`; 
            
            // Aumenta la duración de la animación para que cubra una distancia mayor
            heart.style.animationDuration = Math.random() * 5 + 6 + 's'; // Ahora de 6 a 11 segundos
            heart.style.opacity = Math.random() * 0.7 + 0.3; 
            heart.style.fontSize = Math.random() * 2 + 1 + 'em'; 
            heart.textContent = '❤️';
            body.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }

    // CSS para los corazones (¡ACTUALIZADO para caer más abajo!)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .heart {
            position: absolute;
            color: #e91e63;
            animation: fall linear forwards;
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap; 
        }

        @keyframes fall {
            to {
                /* CAMBIO CLAVE: Usa un valor grande en vh para asegurar que caiga por toda la página */
                /* Asumimos que 200vh será suficiente para la mayoría de los casos. */
                /* Si tu página es MUY larga, podrías necesitar un valor aún mayor. */
                transform: translateY(200vh); 
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
});