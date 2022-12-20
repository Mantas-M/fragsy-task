"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { google } = require('googleapis');
const open = require('open');
const axios = require('axios');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const youtubeUrlParser = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    }
    else {
        throw new Error("Failed to get Youtube video ID");
    }
};
const youtubeVideoId = youtubeUrlParser(process.env.YOUTUBE_URL);
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
const url = oauth2Client.generateAuthUrl({
    response_type: 'code',
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
    prompt: 'consent',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield open(url);
    }
    catch (error) {
        console.log(error.message);
    }
}))();
const getRating = (code) => __awaiter(void 0, void 0, void 0, function* () {
    let tokens = yield oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const accessToken = tokens.tokens.access_token;
    try {
        const res = yield axios.get('https://www.googleapis.com/youtube/v3/videos/getRating', { params: { access_token: accessToken, id: youtubeVideoId } });
        if (res.status == 401)
            throw new Error("Auth Failed");
        return res.data.items[0].rating;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getRating = getRating;
