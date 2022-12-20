import * as dotenv from 'dotenv'
dotenv.config()

export const parseYoutubeLinkFromEnv = () => {
    const url = process.env.YOUTUBE_URL!
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        throw new Error("Failed to get Youtube video ID");
    }
}
