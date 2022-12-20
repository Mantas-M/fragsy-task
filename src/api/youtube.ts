import * as dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis';

const clientId = process.env.CLIENT_ID!
const clientSecret = process.env.CLIENT_SECRET!
const redirectUri = process.env.REDIRECT_URL!

export const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

export const youtube = google.youtube({
    version: 'v3',
    auth: oAuth2Client,
  });