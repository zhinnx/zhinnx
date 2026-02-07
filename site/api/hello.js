import { createHandler } from './handler.js';

export default createHandler(async (req, res) => {
  return {
    message: "Hello from zhinnx!",
    timestamp: new Date().toISOString()
  };
});
