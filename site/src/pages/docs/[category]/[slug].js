import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class DocsPage extends Component {
    static meta = {
        title: 'Documentation - ZhinNX',
        description: 'Official ZhinNX Documentation'
    }

    static async getProps({ params }) {
        // SSR-Only: We can use dynamic imports for fs/path if needed,
        // OR simply fetch from our own API to keep logic unified.
        // For performance in SSR, direct FS access is better.
        if (typeof window === 'undefined') {
            try {
                const fs = await import('fs');
                const path = await import('path');
                const matter = (await import('gray-matter')).default;
                const marked = (await import('marked')).marked;

                const { category, slug } = params;
                const ROOT_DIR = process.env.ZHINNX_ROOT ? path.resolve(process.cwd(), process.env.ZHINNX_ROOT) : process.cwd();

                const filePath = path.join(ROOT_DIR, 'src', 'docs', category, `${slug}.md`);

                if (!fs.existsSync(filePath)) {
                    return { error: 'Document not found' };
                }

                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data, content } = matter(fileContent);
                const htmlContent = marked(content);

                // Build Sidebar
                const sidebar = [];
                const docsRoot = path.join(ROOT_DIR, 'src', 'docs');
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

                return {
                    content: htmlContent,
                    meta: data,
                    sidebar,
                    category,
                    slug
                };
            } catch (e) {
                console.error('Docs SSR Error:', e);
                return { error: 'Internal Server Error' };
            }
        }
        return {};
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: !props.content && !props.error,
            content: props.content,
            meta: props.meta || {},
            sidebar: props.sidebar || [],
            error: props.error
        };
    }

    async onMount() {
        // Client-Side Navigation: Fetch content if missing
        if (!this.state.content && !this.state.error) {
            const { category, slug } = this.props.params;
            try {
                const res = await fetch(`/api/docs?category=${category}&slug=${slug}`);
                if (!res.ok) throw new Error('Failed to load documentation');
                const data = await res.json();
                this.setState({
                    content: data.content,
                    meta: data.meta,
                    sidebar: data.sidebar,
                    loading: false
                });
                // Update Page Title
                if (data.meta && data.meta.title) {
                    document.title = data.meta.title;
                }
            } catch (e) {
                this.setState({ loading: false, error: e.message });
            }
        }
    }

    render() {
        const { content, sidebar, error, loading } = this.state;
        const { category, slug } = this.props.params || {};

        if (loading) {
             return html`
                <div class="min-h-screen bg-white font-sans">
                    <div id="navbar-mount" z-preserve="true">${new Navbar({ static: true }).render()}</div>
                    <div class="flex justify-center items-center h-[50vh]">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                </div>
            `;
        }

        if (error) {
            return html`
                <div class="min-h-screen bg-white font-sans">
                    <div id="navbar-mount" z-preserve="true">${new Navbar({ static: true }).render()}</div>
                    <div class="max-w-7xl mx-auto px-4 py-20 text-center">
                        <h1 class="text-4xl font-bold mb-4">404</h1>
                        <p class="text-xl mb-8">${error}</p>
                        <a href="/docs" class="bg-black text-white px-6 py-3 font-bold border-2 border-black comic-shadow hover:bg-gray-800">Back to Docs</a>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="min-h-screen bg-white font-sans">
                <div id="navbar-mount" z-preserve="true">${new Navbar({ static: true }).render()}</div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row py-10 gap-10">
                        <!-- Sidebar -->
                        <aside class="w-full md:w-64 flex-shrink-0">
                            <nav class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                                ${sidebar.map(section => html`
                                    <div class="mb-6">
                                        <h3 class="font-bold uppercase text-sm text-gray-500 mb-3 tracking-wider">${section.name.replace('-', ' ')}</h3>
                                        <ul class="space-y-2 border-l-2 border-gray-100 pl-4">
                                            ${section.items.map(item => html`
                                                <li>
                                                    <a href="${item.path}" class="block text-gray-700 hover:text-black hover:font-bold ${item.path.includes(slug) ? 'font-bold text-black border-l-4 border-black -ml-[18px] pl-4' : 'transition-colors'}">
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
                        <main class="flex-1 min-w-0" style="content-visibility: auto; contain-intrinsic-size: 1px 1000px;">
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
