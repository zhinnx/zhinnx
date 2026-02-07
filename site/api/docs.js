import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export default async function handler(req, res) {
    const { category, slug } = req.query;

    if (!category || !slug) {
        return res.status(400).json({ error: 'Missing category or slug' });
    }

    try {
        const filePath = path.join(process.cwd(), 'src', 'docs', category, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const htmlContent = marked(content);

        // Build Sidebar (Simplified for API response)
        const sidebar = [];
        const docsRoot = path.join(process.cwd(), 'src', 'docs');
        if (fs.existsSync(docsRoot)) {
            const categories = fs.readdirSync(docsRoot);
            for (const cat of categories) {
                const catPath = path.join(docsRoot, cat);
                if (fs.statSync(catPath).isDirectory()) {
                    const files = fs.readdirSync(catPath)
                        .filter(f => f.endsWith('.md'))
                        .map(f => {
                             const name = f.replace('.md', '');
                             return { name, path: `/docs/${cat}/${name}` };
                        });
                    sidebar.push({ name: cat, items: files });
                }
            }
        }

        res.status(200).json({
            content: htmlContent,
            meta: data,
            sidebar,
            category,
            slug
        });
    } catch (error) {
        console.error('Docs API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
