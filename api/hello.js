import { createHandler } from './handler.js';

export default createHandler(async (req, res) => {
  return {
    message: "Hello from ZhinStack!",
    timestamp: new Date().toISOString()
  };
});
