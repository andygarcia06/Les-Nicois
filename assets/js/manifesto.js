document.addEventListener("DOMContentLoaded", () => {
    const allImages = [
        "./assets/img/restaurant/photo-1.jpg",
        "./assets/img/restaurant/photo-2.jpg",
        "./assets/img/restaurant/photo-3.jpg",
        "./assets/img/restaurant/photo-4.jpg",
        "./assets/img/restaurant/photo-5.jpg",
        "./assets/img/restaurant/photo-6.jpg",
        "./assets/img/restaurant/photo-7.jpg",
        "./assets/img/restaurant/photo-8.jpg",
        "./assets/img/restaurant/photo-9.jpg",
        "./assets/img/restaurant/photo-10.jpg",
        "./assets/img/restaurant/photo-11.jpg",
        "./assets/img/restaurant/photo-12.jpg",
        "./assets/img/restaurant/photo-13.jpg",
        "./assets/img/restaurant/photo-14.jpg",
        "./assets/img/restaurant/photo-15.jpg",
        "./assets/img/restaurant/photo-16.jpg",
        "./assets/img/restaurant/photo-17.jpg",
        "./assets/img/restaurant/photo-18.jpg"
    ];

    const leftImages = allImages.slice(0, 6);   // Images 1 à 6
    const middleImages = allImages.slice(6, 12); // Images 7 à 12
    const rightImages = allImages.slice(12, 18); // Images 13 à 18

    let leftIndex = 0;
    let middleIndex = 0;
    let rightIndex = 0;

    function changeImage(elementId, images, index) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.backgroundImage = `url(${images[index]})`;
        } else {
            console.error(`Element with ID '${elementId}' not found.`);
        }
    }

    function rotateImages(section, images, index) {
        index = (index + 1) % images.length;
        changeImage(section, images, index);
        return index;
    }

    // Initialisation des index
    let leftTimer = 0;
    let middleTimer = 2000; // Début avec 1 seconde de retard
    let rightTimer = 3000;  // Début avec 2 secondes de retard

    // Fonction pour démarrer les rotations d'images avec des décalages
    function startRotations() {
        setInterval(() => {
            leftIndex = rotateImages('left-image', leftImages, leftIndex);
        }, 4000); // Change toutes les 4 secondes pour la section gauche

        setTimeout(() => {
            setInterval(() => {
                middleIndex = rotateImages('middle-image', middleImages, middleIndex);
            }, 4000); // Change toutes les 4 secondes pour la section du milieu
        }, middleTimer);

        setTimeout(() => {
            setInterval(() => {
                rightIndex = rotateImages('right-image', rightImages, rightIndex);
            }, 4000); // Change toutes les 4 secondes pour la section droite
        }, rightTimer);
    }

    startRotations(); // Lance les rotations

    async function fetchInstagramData() {
        try {
            const response = await fetch('http://localhost:3000/fetch-instagram-data');
            const data = await response.json();

            // Afficher le nom d'utilisateur
            const usernameElement = document.getElementById('instagram-username');
            usernameElement.textContent = `@${data.username}`;

            // Afficher les 9 dernières images
            const feedElement = document.getElementById('instagram-feed');
            data.media.forEach(media => {
                if (media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM' || media.media_type === 'VIDEO') {
                    const container = document.createElement('div');
                    container.className = 'instagram-image';

                    const imgElement = document.createElement('img');
                    imgElement.src = media.media_url;
                    imgElement.alt = media.caption || 'Instagram image';
                    
                    container.appendChild(imgElement);
                    feedElement.appendChild(container);
                }
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des données Instagram:', error);
        }
    }

    // Récupérer les données lorsque la page est chargée
    window.onload = fetchInstagramData;
    // Récupérer les données lorsque la page est chargée
    window.onload = fetchInstagramData;
});
