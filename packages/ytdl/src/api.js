/**
 * YouTube Data Fetcher
 * Proxies through the official site API to ensure stability and hide keys.
 */
export async function useYouTube(url) {
    if (!url) return null;
    try {
        // Use relative path to hit the local server API
        const res = await fetch(`/api/ytdl?url=${encodeURIComponent(url)}`);

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Failed to fetch video data');
        }

        const data = await res.json();

        if (data.error) {
            throw new Error(data.message);
        }

        // Normalize Data Structure (Double check)
        return {
            title: data.title || 'Unknown Video',
            duration: data.duration || '0:00',
            thumbnail: data.thumbnail || '',
            video: Array.isArray(data.video) ? data.video : [],
            audio: Array.isArray(data.audio) ? data.audio : []
        };
    } catch (e) {
        console.error('YTDL Error:', e);
        throw e;
    }
}
