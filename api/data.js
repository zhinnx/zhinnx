import { createHandler } from './handler.js';

export default createHandler(async (req, res) => {
  if (req.method === 'POST') {
    const { name } = req.body || {};
    return {
      status: 'success',
      receivedName: name,
      message: `Welcome to ZhinStack, ${name || 'Stranger'}!`
    };
  }

  return { error: 'Method not allowed', hint: 'Try POST' };
});
