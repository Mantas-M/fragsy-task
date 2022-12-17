require('dotenv').config()
const { google } = require('googleapis');
const open = require('open')
const axios = require('axios')
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUrl = process.env.REDIRECT_URL

const youtubeUrlParser = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    throw new Error("Failed to get Youtube video ID"); 
  }
}

const youtubeVideoId = youtubeUrlParser((process.env.YOUTUBE_URL as string))

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);

const url: string = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
  prompt: 'consent',
});

(async (): Promise<void> => {
  try {
    await open(url)
  } catch (error) {
    console.log((error as Error).message)
  }
})()

const getRating = async (code: string): Promise<string | void> => {
  let tokens = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  const accessToken = tokens.tokens.access_token

  try {
    const res = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos/getRating', { params: { access_token: accessToken, id: youtubeVideoId } })
    if (res.status == 401) throw new Error("Auth Failed");

    return res.data.items[0].rating
  } catch (error) {
    console.log((error as Error).message)
  }
}

exports.getRating = getRating