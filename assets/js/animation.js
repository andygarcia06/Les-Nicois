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
            duration: 2,
            ease: "power2.inOut"
        }).to("#preloader", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                // Supprimer le préchargeur du DOM
                document.getElementById("preloader").style.display = "none";
            }
        }, "+0.4");
    }, 3000); // Démarre l'animation après 3 secondes
});
