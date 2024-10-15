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
    const accessToken = 'IGQWRNbFRDVU95UW10SzlkeXNZAOS11ZAV8xdHFwSWNvblFGR3M2ZAVFwX1puaTVTSzh0emdpdnpLRlBpaEJjRnJ1ZAlIzcDUwMWp1bEtsQkVCbS00a0c1ZAnk4WFh2bTV2OWtkVDBvcHFCMWxRZAwZDZD';

    async function fetchInstagramData() {
        try {
            // Récupérer les données depuis l'API
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

        // Vérifier qu'on a bien 7 photos
        if (media.length < 8) {
            console.error('Moins de 8 photos disponibles.');
            return;
        }

        // Afficher le nom d'utilisateur
        const usernameSection = document.getElementById('instagram-username');
        if (usernameSection) {
            usernameSection.innerHTML = `<h3>@${username}</h3>`;
        }

        // Remplir les images dans les bons blocs
        document.getElementById('large-image').src = media[0].media_url; // Grande image
        document.getElementById('center-image-1').src = media[1].media_url; // 1ère image centre
        document.getElementById('center-image-2').src = media[2].media_url; // 2ème image centre
        document.getElementById('right-image-1').src = media[3].media_url; // 1ère image droite colonne 1
        document.getElementById('right-image-2').src = media[4].media_url; // 2ème image droite colonne 1
        document.getElementById('right-image-3').src = media[5].media_url; // 3ème image droite colonne 1
        document.getElementById('right-image-4').src = media[6].media_url; // 1ère image droite colonne 2
        document.getElementById('right-image-5').src = media[7].media_url; // 2ème image droite colonne 2
        // Le logo Instagram est statique, pas besoin de le remplir avec l'API
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

document.addEventListener("DOMContentLoaded", function() {
    // Ouvrir la popup
    document.querySelector("a[href='shop.html']").addEventListener("click", function(e) {
        e.preventDefault(); // Empêcher le comportement par défaut
        document.getElementById("wip-popup").style.display = "block";
    });

    // Fermer la popup
    document.querySelector(".wip-popup-close").addEventListener("click", function() {
        document.getElementById("wip-popup").style.display = "none";
    });

    // Rendre la popup déplaçable
    dragElement(document.getElementById("wip-popup"));

    function dragElement(element) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var header = element.querySelector(".wip-popup-header");

        if (header) {
            header.onmousedown = dragMouseDown;
            header.classList.add('grab'); // Ajouter la classe "grab" par défaut
        }

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Changer le curseur en "grabbing" (main fermée)
            header.classList.remove('grab');
            header.classList.add('grabbing');

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;

            // Remettre le curseur en "grab" (main ouverte)
            header.classList.remove('grabbing');
            header.classList.add('grab');
        }
    }
});
