/**
 * zhinnx Core - API
 * A unified wrapper for making API requests.
 */

export class API {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async request(endpoint, method = 'GET', data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, 'GET');
  }

  post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  }

  put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  }

  delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }
}

// Export a default instance
export default new API();
