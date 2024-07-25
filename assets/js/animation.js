document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = ["#section-1", "#section-2", "#section-3"];

    sections.forEach((id, index) => {
        gsap.fromTo(id + " .content", 
            { opacity: 0 }, 
            { 
                opacity: 1, 
                duration: 3, // Durée de l'animation en secondes
                scrollTrigger: {
                    trigger: id,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });


});
