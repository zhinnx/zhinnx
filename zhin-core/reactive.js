
// ZhinStack v2 Reactivity System
// Inspired by Vue 3's Reactivity

let activeEffect = null;
const targetMap = new WeakMap();

/**
 * Tracks dependencies for a reactive property.
 * @param {Object} target
 * @param {string} key
 */
function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            depsMap = new Map();
            targetMap.set(target, depsMap);
        }
        let dep = depsMap.get(key);
        if (!dep) {
            dep = new Set();
            depsMap.set(key, dep);
        }
        dep.add(activeEffect);
    }
}

/**
 * Triggers effects associated with a reactive property.
 * @param {Object} target
 * @param {string} key
 */
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (dep) {
        // Run effects
        // We copy the set to avoid infinite loops if effects trigger themselves
        const effectsToRun = new Set(dep);
        effectsToRun.forEach(eff => eff());
    }
}

/**
 * Creates a reactive proxy for an object.
 * @param {Object} target
 * @returns {Proxy}
 */
export function reactive(target) {
    return new Proxy(target, {
        get(obj, prop) {
            track(obj, prop);
            return Reflect.get(obj, prop);
        },
        set(obj, prop, value) {
            const oldValue = obj[prop];
            const result = Reflect.set(obj, prop, value);
            if (oldValue !== value) {
                trigger(obj, prop);
            }
            return result;
        }
    });
}

/**
 * Registers a side effect that runs when dependencies change.
 * @param {Function} eff
 */
export function effect(eff) {
    const wrappedEffect = () => {
        const previousEffect = activeEffect;
        activeEffect = wrappedEffect;
        try {
            eff();
        } finally {
            activeEffect = previousEffect;
        }
    };
    wrappedEffect();
    return wrappedEffect; // Return runner if needed
}

/**
 * Creates a computed property.
 * @param {Function} getter
 * @returns {Object} { value }
 */
export function computed(getter) {
    const result = { value: undefined };
    effect(() => {
        result.value = getter();
    });
    return result; // Simple implementation for now
}
