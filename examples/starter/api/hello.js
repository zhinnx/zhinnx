import { createHandler } from '@zhinnx/server';

export default createHandler(async (req, res) => {
    return { message: "Hello from zhinnx API!" };
});
