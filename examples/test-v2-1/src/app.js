import { defineApp } from '@zhinnx/core';
import { defineFont } from '@zhinnx/font';

export default defineApp({
    plugins: [
        defineFont({
            name: 'TestFont',
            src: ['/fonts/Test.woff2'],
            weight: [400]
        })
    ]
});
