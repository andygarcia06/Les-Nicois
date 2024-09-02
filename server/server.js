import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';  // Ajoutez cette ligne



const app = express();

const clientId = '1077077414006940';
const clientSecret = '4817228961952b02f53b0818f08ab975';
const redirectUri = 'https://fronthand.fr/';

app.use(cors());


app.get('/', (req, res) => {
    // Redirige l'utilisateur vers l'URL d'autorisation Instagram
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    res.send(`<a href="${authUrl}">Connectez-vous à Instagram</a>`);
});

app.get('/auth', async (req, res) => {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        return res.status(400).send('Le code d\'autorisation est manquant.');
    }

    try {
        // Échange le code d'autorisation contre un jeton d'accès court terme
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
                code: authorizationCode
            })
        });

        const tokenText = await tokenResponse.text(); // Récupère la réponse sous forme de texte brut
        console.log('Réponse brute de l\'API Instagram:', tokenText); // Affiche la réponse brute

        const tokenData = JSON.parse(tokenText); // Tente d'analyser la réponse en JSON

        if (tokenData.error) {
            return res.status(400).send(`Erreur: ${tokenData.error.message}`);
        }

        const shortTermToken = tokenData.access_token;
        console.log('Jeton d\'accès court terme:', shortTermToken);

        // Échange le jeton d'accès court terme contre un jeton d'accès long terme
        const longTermTokenResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortTermToken}`, {
            method: 'GET'
        });

        const longTermTokenData = await longTermTokenResponse.json();

        if (longTermTokenData.error) {
            return res.status(400).send(`Erreur: ${longTermTokenData.error.message}`);
        }

        const longTermToken = 'IGQWRPUjdKRzdzaThCeV92dnpjXzJYYWQ0X1dpeFFlTWJKUTdBREc5OFdVMzRvN2lWc1dkS1l4eFJMOVFMaEo3dmt4RlIzOWlLNHRfQjNocFVmRzdxLUwxMGcyLWRRNmtRSEhkTjE2SDN4QQZDZD';
        console.log('Jeton d\'accès long terme:', longTermToken);

        res.send(`Jeton d'accès long terme: ${longTermToken}`);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur.');
    }
});

const longTermToken = 'IGQWRPUjdKRzdzaThCeV92dnpjXzJYYWQ0X1dpeFFlTWJKUTdBREc5OFdVMzRvN2lWc1dkS1l4eFJMOVFMaEo3dmt4RlIzOWlLNHRfQjNocFVmRzdxLUwxMGcyLWRRNmtRSEhkTjE2SDN4QQZDZD';

app.get('/fetch-instagram-data', async (req, res) => {
    try {
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=username&access_token=${longTermToken}`);
        const userData = await userResponse.json();

        if (userData.error) {
            return res.status(400).json({ error: userData.error.message });
        }

        const mediaResponse = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${longTermToken}&limit=9`);
        const mediaData = await mediaResponse.json();

        if (mediaData.error) {
            return res.status(400).json({ error: mediaData.error.message });
        }

        res.json({
            username: userData.username,
            media: mediaData.data
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});


app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
