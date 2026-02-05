export async function useYouTube(url) {
    if (!url) return null;
    try {
        const res = await fetch(`https://zhin-api.vercel.app/ytdl?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error('Failed to fetch video data');
        const data = await res.json();
        return data; // already normalized as per prompt?
        // Prompt says "Normalized output: { title, duration, thumbnail, video[], audio[], other[] }"
        // Assuming API returns this structure.
    } catch (e) {
        console.error('YTDL Error:', e);
        throw e;
    }
}
