import { Component, html } from '@zhinnx/core';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMenuOpen: false
        };
    }

    toggleMenu(e) {
        if (e) e.preventDefault();
        this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
    }

    closeMenu() {
        this.setState({ mobileMenuOpen: false });
    }

    render() {
        const isOpen = this.state.mobileMenuOpen;
        const isStatic = this.props && this.props.static;

        // Clean event handlers for template literals
        // We use function references which template-literal-engine (vdom) should handle.
        // If isStatic, we pass undefined/null which shouldn't render attributes.
        const toggle = isStatic ? undefined : (e) => this.toggleMenu(e);
        const close = isStatic ? undefined : () => this.closeMenu();

        // Hamburger Icon SVG
        const hamburgerIcon = isOpen
            ? 'M6 18L18 6M6 6l12 12'
            : 'M4 6h16M4 12h16M4 18h16';

        return html`
            <nav class="sticky top-0 z-50 bg-white border-b-2 border-black font-sans">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-20 items-center">
                        <div class="flex items-center gap-3">
                            <a href="/" class="flex items-center gap-3 hover:opacity-75" onclick="${close}">
                                <img src="/zhinnx_nobg.png" alt="ZhinNX" class="h-10 w-10 object-contain" width="40" height="40" loading="eager">
                                <span class="text-2xl font-bold tracking-tighter">ZhinNX</span>
                            </a>
                        </div>

                        <!-- Desktop Menu -->
                        <div class="hidden md:flex space-x-8 items-center">
                            <a href="/plugins" class="text-black font-bold hover:underline decoration-2 underline-offset-4">Plugins</a>
                            <a href="/docs" class="bg-black text-white px-6 py-2 font-bold comic-shadow hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-black">Docs</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="text-black font-bold hover:underline decoration-2 underline-offset-4">GitHub</a>
                        </div>

                        <!-- Mobile Menu Button -->
                        <div class="md:hidden">
                            <button class="p-2 border-2 border-black hover:bg-gray-100 focus:outline-none touch-manipulation flex items-center justify-center"
                                    aria-label="Toggle Menu"
                                    onclick="${toggle}">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${hamburgerIcon}" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Dropdown -->
                <div class="md:hidden border-t-2 border-black bg-white absolute w-full left-0 z-40 shadow-xl overflow-hidden transition-all duration-300 ease-linear ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}" style="transition-timing-function: steps(5);">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/" onclick="${close}" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Home</a>
                        <a href="/plugins" onclick="${close}" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Plugins</a>
                        <a href="/docs" onclick="${close}" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Documentation</a>
                        <a href="https://github.com/zhinnx/zhinnx" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50">GitHub</a>
                    </div>
                </div>
            </nav>
        `;
    }
}
