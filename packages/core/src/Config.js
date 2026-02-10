/**
 * zhinnx Core - Config
 * Singleton configuration store for the framework.
 */

const defaultConfig = {
    smartImage: false,
    chunkRender: false,
    selfHealing: false,
    priorityRender: false
};

class ConfigStore {
    constructor() {
        this.config = { ...defaultConfig };
        if (typeof window !== 'undefined' && window.__ZHINNX_CONFIG__) {
            this.load(window.__ZHINNX_CONFIG__);
        }
    }

    /**
     * Get a configuration value.
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        return this.config[key];
    }

    /**
     * Set a configuration value.
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        this.config[key] = value;
    }

    /**
     * Reset configuration to defaults.
     */
    reset() {
        this.config = { ...defaultConfig };
    }

    /**
     * Load configuration from an object (e.g. JSON file).
     * @param {Object} newConfig
     */
    load(newConfig) {
        Object.assign(this.config, newConfig);
    }
}

export const Config = new ConfigStore();
