import { URL } from 'url';

export default async function handler(req, res) {
    const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const youtubeUrl = urlParams.get('url');

    res.setHeader('Content-Type', 'application/json');

    if (!youtubeUrl) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: true, message: 'URL is required' }));
        return;
    }

    try {
        // Mock Implementation for Stability/Demo purposes
        // In a real production environment, you'd use a robust library like ytdl-core here.
        // However, since this is a framework demo site, we prioritize uptime and correctness of the frontend flow.

        // Simulating a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Basic Validation
        if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
             throw new Error('Invalid YouTube URL');
        }

        // Return Normalized Data Structure
        const data = {
            title: "ZhinNX Framework - The Future of Web Development (Demo Video)",
            duration: "10:24",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", // Placeholder
            video: [
                { quality: "1080p", size: "145 MB", url: "#" },
                { quality: "720p", size: "89 MB", url: "#" },
                { quality: "360p", size: "45 MB", url: "#" }
            ],
            audio: [
                { size: "12 MB", url: "#" },
                { size: "5 MB", url: "#" }
            ]
        };

        res.statusCode = 200;
        res.end(JSON.stringify(data));

    } catch (e) {
        console.error('YTDL Proxy Error:', e);
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: true,
            message: e.message || 'Failed to fetch video data'
        }));
    }
}
