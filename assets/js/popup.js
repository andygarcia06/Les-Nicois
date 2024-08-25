document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('carte-popup');
    const openBtn = document.querySelector('.open-popup');
    const closeBtn = document.querySelector('.close-popup');

    // Ouvrir la popup
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
    });

    // Fermer la popup
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Fermer la popup lorsqu'on clique à l'extérieur du contenu
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
