import { Component, html } from './Component.js';
import { Config } from './Config.js';

export class SmartImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: false,
            retryCount: 0,
            currentSrc: props.src
        };
    }

    handleError() {
        const maxRetries = 2;
        if (this.state.retryCount < maxRetries) {
            // Retry logic: Append retry param to force browser reload
            const sep = this.props.src.includes('?') ? '&' : '?';
            const nextRetry = this.state.retryCount + 1;

            // Simple exponential backoff
            setTimeout(() => {
                this.setState({
                    retryCount: nextRetry,
                    currentSrc: `${this.props.src}${sep}zhin_retry=${nextRetry}`
                });
            }, 1000 * nextRetry);
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        const { src, alt, fallback, placeholder, class: className = '', width, height } = this.props;
        const { loaded, error, currentSrc } = this.state;

        // Pass-through props helper
        const sizeProps = (width ? `width="${width}" ` : '') + (height ? `height="${height}" ` : '');

        if (!Config.get('smartImage')) {
             return html`<img src="${src}" alt="${alt}" class="${className}" ${sizeProps}/>`;
        }

        if (error) {
             if (fallback) {
                 return html`<img src="${fallback}" alt="${alt}" class="${className}" ${sizeProps}/>`;
             }
             // Default Fallback Visual
             return html`
                <div class="${className} bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 p-4" style="min-height: ${height || '100px'}; width: ${width || '100%'};">
                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
             `;
        }

        // Wrapper allows stacking placeholder and real image
        // We use inline-block to match img behavior usually, but implementation details vary.
        // Assuming block or similar.
        return html`
            <div class="relative overflow-hidden ${className}" style="display: inline-block; min-height: ${height ? height + 'px' : 'auto'}; width: ${width ? width + 'px' : 'auto'};">
                ${!loaded ? (placeholder
                    ? html`<img src="${placeholder}" class="absolute inset-0 w-full h-full object-cover blur-sm scale-110" alt="" />`
                    : html`<div class="absolute inset-0 bg-gray-200 animate-pulse"></div>`)
                : ''}

                <img
                    src="${currentSrc}"
                    alt="${alt}"
                    class="block w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}"
                    onload="${() => this.setState({ loaded: true })}"
                    onerror="${() => this.handleError()}"
                    ${sizeProps}
                />
            </div>
        `;
    }
}
