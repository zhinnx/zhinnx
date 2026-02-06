import { defineApp } from '@zhinnx/core';
import { defineFont } from '@zhinnx/font';
import { defineUI } from '@zhinnx/ui';
import { defineYTDL } from '@zhinnx/ytdl';

export default defineApp({
    plugins: [
        defineFont({
            name: 'Space Grotesk',
            src: ['https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oYXk.woff2'],
            weight: [400, 500, 700],
            display: 'swap'
        }),
        defineUI(),
        defineYTDL()
    ]
});
