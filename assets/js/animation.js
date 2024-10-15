document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = ["#section-1", "#section-2", "#section-3"];

    sections.forEach((id, index) => {
        gsap.fromTo(id + " .content", 
            { opacity: 0 }, 
            { 
                opacity: 1, 
                duration: 0.5, // Durée de l'animation en secondes
                scrollTrigger: {
                    trigger: id,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });


});


window.addEventListener('load', () => {
    // Attendre que le reste du contenu soit chargé
    setTimeout(() => {
        const timeline = gsap.timeline();

        // Réduire le logo et diminuer l'opacité du fond
        timeline.to("#preloader .title-container", {
            scale: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }).to("#preloader", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                // Supprimer le préchargeur du DOM
                document.getElementById("preloader").style.display = "none";
            }
        }, "+0.1");
    }, 3000); // Démarre l'animation après 3 secondes
});

function applyTapToShowContent() {
    if (window.innerWidth <= 768) {  // Vérifie si l'écran est de la taille d'une tablette ou moins
        document.querySelectorAll('.index-section-link').forEach(link => {
            let tapped = false; // Définir une variable pour chaque lien

            link.addEventListener('click', function(event) {
                const content = this.querySelector('.index-content');

                if (!tapped) {  // Si c'est le premier tapotement
                    event.preventDefault();  // Empêche le lien de suivre immédiatement
                    content.style.opacity = 1;  // Affiche le contenu
                    tapped = true;  // Marque que la section a été tapotée une première fois

                    // Réinitialise l'état des autres sections
                    document.querySelectorAll('.index-section-link').forEach(otherLink => {
                        if (otherLink !== link) {
                            otherLink.querySelector('.index-content').style.opacity = 0;
                            otherLink.dataset.tapped = 'false';
                        }
                    });

                    this.dataset.tapped = 'true';  // Marque que cette section est maintenant active
                } else {
                    // Réinitialise pour la prochaine interaction
                    tapped = false;
                    this.dataset.tapped = 'false';
                }
            });

            // Réinitialise le statut au tapotement sur une autre section
            link.addEventListener('touchstart', function() {
                document.querySelectorAll('.index-section-link').forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.dataset.tapped = 'false';
                    }
                });
            });
        });
    }
}

// Appliquer au chargement de la page
applyTapToShowContent();

// Ré-appliquer si la fenêtre est redimensionnée
window.addEventListener('resize', function() {
    applyTapToShowContent();
});

document.addEventListener('DOMContentLoaded', function() {
    const infoEncart = document.getElementById('index-infos-encart');
    const infoMenu = document.getElementById('index-infos-menu');
    let menuOpen = false;

    infoEncart.addEventListener('click', function() {
        if (!menuOpen) {
            // Ouvrir le menu en l'animant de la gauche vers la droite
            infoMenu.classList.add('active');
            menuOpen = true;
        } else {
            // Fermer le menu en le rétractant vers la gauche
            infoMenu.classList.remove('active');
            menuOpen = false;
        }
    });
});




