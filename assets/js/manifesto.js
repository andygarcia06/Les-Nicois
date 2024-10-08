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
    
});


document.addEventListener("DOMContentLoaded", () => {
    const accessToken = 'IGQWRQUjlVZA1ltX0lZAVmhSQ0NqUmxkcThxWEtvWEhuS2Q4YjllTGREd2Q4ZA2x0YTd4aTdEOGlRSjNuU3lHbmZA2ZAjAtVVF0dGpKOGRuS0VmdXRrcFhqeDJ1bmJGNGw0b2NBX0tnLUI0YnJidwZDZD'; // Remplacez par votre vrai token

    async function fetchInstagramData() {
        try {
            // Récupérer les données depuis l'API via le serveur
            const response = await fetch(`http://localhost:3000/fetch-instagram-data?access_token=${accessToken}`);
            const data = await response.json();
    
            if (data.error) {
                console.error('Erreur lors de la récupération des données:', data.error);
                return;
            }
    
            // Afficher les données
            displayInstagramData(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }
    
    function displayInstagramData(data) {
        const { username, media } = data;

        // Vérifier qu'on a bien au moins 18 photos
        if (media.length < 18) {
            console.error('Moins de 18 photos disponibles.');
            return;
        }
    
        // Afficher le nom d'utilisateur
        const usernameSection = document.getElementById('instagram-username');
        if (usernameSection) {
            usernameSection.innerHTML = `<h3>@${username}</h3>`;
        }

        // Diviser les 18 photos en 3 blocs de 6 photos
        const block1Photos = media.slice(0, 6);  // Les 6 dernières photos
        const block2Photos = media.slice(6, 12); // Les 6 suivantes
        const block3Photos = media.slice(12, 18); // Les 6 plus anciennes

        // Afficher les photos dans le block 1
        const block1Section = document.getElementById('block-1');
        if (block1Section) {
            block1Section.innerHTML = block1Photos.map(photo => `
                <div class="photo">
                    <img src="${photo.media_url}" alt="${photo.caption || 'Photo Instagram'}">
                </div>
            `).join('');
        }

        // Afficher les photos dans le block 2
        const block2Section = document.getElementById('block-2');
        if (block2Section) {
            block2Section.innerHTML = block2Photos.map(photo => `
                <div class="photo">
                    <img src="${photo.media_url}" alt="${photo.caption || 'Photo Instagram'}">
                </div>
            `).join('');
        }

        // Afficher les photos dans le block 3
        const block3Section = document.getElementById('block-3');
        if (block3Section) {
            block3Section.innerHTML = block3Photos.map(photo => `
                <div class="photo">
                    <img src="${photo.media_url}" alt="${photo.caption || 'Photo Instagram'}">
                </div>
            `).join('');
        }
    }
    
    // Appel initial pour récupérer et afficher les données Instagram
    fetchInstagramData();
});

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.manifesto-swiper-container', {
        slidesPerView: 1, // Nombre de slides visibles en même temps
        spaceBetween: 10,
        loop: true, // Boucler en fin de slides
        autoplay: {
            delay: 5000, // Temps entre chaque slide en ms
            disableOnInteraction: false, // L'autoplay ne s'arrête pas au "grab"
        },
        grabCursor: true,

    });
});

