import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';
import { marked } from 'marked';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export default class DocsPage extends Component {
    static meta = {
        title: 'Documentation - ZhinNX',
        description: 'Official ZhinNX Documentation'
    }

    static async getProps({ params }) {
        const { category, slug } = params;

        const filePath = path.join(process.cwd(), 'src', 'docs', category, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return { error: 'Document not found' };
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const htmlContent = marked(content);

        // Build Sidebar Navigation
        const sidebar = [];
        const categories = fs.readdirSync(path.join(process.cwd(), 'src', 'docs'));

        for (const cat of categories) {
            const catPath = path.join(process.cwd(), 'src', 'docs', cat);
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

        return {
            content: htmlContent,
            meta: data,
            sidebar,
            category,
            slug
        };
    }

    render() {
        const { content, meta, sidebar, error } = this.props;

        if (error) {
            return html`
                <div class="min-h-screen bg-white">
                    <div id="navbar-mount">${new Navbar({ static: true }).render()}</div>
                    <div class="max-w-7xl mx-auto px-4 py-20 text-center">
                        <h1 class="text-4xl font-bold mb-4">404</h1>
                        <p class="text-xl">${error}</p>
                        <a href="/docs" class="text-blue-600 underline">Back to Docs</a>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="min-h-screen bg-white font-sans">
                <div id="navbar-mount">${new Navbar({ static: true }).render()}</div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row py-10 gap-10">
                        <!-- Sidebar -->
                        <aside class="w-full md:w-64 flex-shrink-0">
                            <nav class="sticky top-24">
                                ${sidebar.map(section => html`
                                    <div class="mb-6">
                                        <h3 class="font-bold uppercase text-sm text-gray-500 mb-3 tracking-wider">${section.name.replace('-', ' ')}</h3>
                                        <ul class="space-y-2 border-l-2 border-gray-100 pl-4">
                                            ${section.items.map(item => html`
                                                <li>
                                                    <a href="${item.path}" class="block text-gray-700 hover:text-black hover:font-bold ${item.path.includes(this.props.slug) ? 'font-bold text-black border-l-4 border-black -ml-[18px] pl-4' : 'transition-colors'}">
                                                        ${item.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </a>
                                                </li>
                                            `)}
                                        </ul>
                                    </div>
                                `)}
                            </nav>
                        </aside>

                        <!-- Content -->
                        <main class="flex-1 min-w-0">
                            <article class="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-5xl prose-h1:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-code:bg-gray-100 prose-code:text-black prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-img:rounded-lg prose-img:border-2 prose-img:border-black prose-img:shadow-[4px_4px_0_0_#000]">
                                ${content}
                            </article>
                        </main>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        const navMount = this.$('#navbar-mount');
        if (navMount) new Navbar().mount(navMount);
    }
}
