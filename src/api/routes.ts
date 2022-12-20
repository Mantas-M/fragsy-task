import express from 'express';
import { youtube, oAuth2Client } from './youtube';
import { parseYoutubeLinkFromEnv } from '../utils'

const router = express.Router();

router.get('/', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
        prompt: 'consent',
    });

    res.send(`
    <h3>Please click the button below to authenticate with Youtube</h3>
    <button onclick="window.location.href='${authUrl}';">Authenticate</button>
  `);
});

router.get('/auth/callback', async (req, res) => {
    const code = req.query.code!;
    const tokensResponse = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokensResponse.tokens);

    const videoId = parseYoutubeLinkFromEnv()
    const response = await youtube.videos.getRating({id:videoId})
    const hasLiked = response.data.items[0].rating == 'like'? true : false

    res.send(`
    <h3>You have${hasLiked ? '' : ' not'} liked the video with ID "${videoId}".</h3>
  `);
});

export default router;
