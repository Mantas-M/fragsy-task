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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_1 = require("./youtube");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const authUrl = youtube_1.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
        prompt: 'consent',
    });
    res.send(`
    <h3>Please click the button below to authenticate with Youtube</h3>
    <button onclick="window.location.href='${authUrl}';">Authenticate</button>
  `);
});
router.get('/auth/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const tokensResponse = yield youtube_1.oAuth2Client.getToken(code);
    youtube_1.oAuth2Client.setCredentials(tokensResponse.tokens);
    const videoId = (0, utils_1.parseYoutubeLinkFromEnv)();
    const response = yield youtube_1.youtube.videos.getRating({ id: videoId });
    const hasLiked = response.data.items[0].rating == 'like' ? true : false;
    res.send(`
    <h3>You have${hasLiked ? '' : ' not'} liked the video with ID "${videoId}".</h3>
  `);
}));
exports.default = router;
