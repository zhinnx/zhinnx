import { renderToString } from '../zhin-core/ssr.js';
import MyPage from './MyPage.js';

// Simulate SSR rendering
const pageInstance = new MyPage();
const html = renderToString(pageInstance.render());

console.log('--- SSR Output ---');
console.log(html);
