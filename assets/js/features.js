window.playRadio = function() {
    const player = document.getElementById('radio-player');
    player.play();
    localStorage.setItem('radioPlaying', 'true');
}

window.pauseRadio = function() {
    const player = document.getElementById('radio-player');
    player.pause();
    localStorage.setItem('radioPlaying', 'false');
}

// Intercepter les clics sur les liens de navigation
document.querySelectorAll('.nav-link, .section-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const url = this.getAttribute('href');
        loadPage(url);
    });
});

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Remplacer le contenu principal
            const newContent = doc.querySelector('#content').innerHTML;
            document.querySelector('#content').innerHTML = newContent;

            // Appliquer la classe de corps appropriée
            const newBodyClass = doc.querySelector('body').className;
            document.body.className = newBodyClass;

            // Re-bind event listeners for new content
            document.querySelectorAll('.nav-link, .section-link').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const url = this.getAttribute('href');
                    loadPage(url);
                });
            });

            // Restore radio state
            restoreRadioState();
        })
        .catch(err => console.warn('Something went wrong.', err));
}

function restoreRadioState() {
    const radioPlaying = localStorage.getItem('radioPlaying');
    const player = document.getElementById('radio-player');
    if (radioPlaying === 'true') {
        player.play();
    } else {
        player.pause();
    }
}

// On page load, restore the radio state
document.addEventListener('DOMContentLoaded', () => {
    restoreRadioState();
});
