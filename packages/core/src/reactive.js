// Zhinnx v2 Reactivity System
// Optimized with dependency cleanup and lazy computed properties

let activeEffect = null;
const targetMap = new WeakMap();

/**
 * Tracks dependencies for a reactive property.
 * @param {Object} target
 * @param {string} key
 */
export function track(target, key) {
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
        activeEffect.deps.push(dep);
    }
}

/**
 * Triggers effects associated with a reactive property.
 * @param {Object} target
 * @param {string} key
 */
export function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (dep) {
        const effectsToRun = new Set(dep);
        effectsToRun.forEach(eff => {
            if (eff.scheduler) {
                eff.scheduler();
            } else {
                eff();
            }
        });
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

function cleanupEffect(effectFn) {
    const { deps } = effectFn;
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effectFn);
        }
        deps.length = 0;
    }
}

/**
 * Registers a side effect that runs when dependencies change.
 * @param {Function} fn - The function to run
 * @param {Object} options - { lazy: boolean, scheduler: Function }
 */
export function effect(fn, options = {}) {
    const effectFn = () => {
        // cleanup previous dependencies to avoid memory leaks and stale deps
        cleanupEffect(effectFn);

        const previousEffect = activeEffect;
        activeEffect = effectFn;
        try {
            return fn();
        } finally {
            activeEffect = previousEffect;
        }
    };

    effectFn.deps = [];
    effectFn.scheduler = options.scheduler;

    if (!options.lazy) {
        effectFn();
    }

    return effectFn;
}

/**
 * Creates a computed property.
 * @param {Function} getter
 * @returns {Object} { value }
 */
export function computed(getter) {
    let value;
    let dirty = true;

    const effectFn = effect(getter, {
        lazy: true,
        scheduler: () => {
            if (!dirty) {
                dirty = true;
                trigger(computedObj, 'value');
            }
        }
    });

    const computedObj = {
        get value() {
            if (dirty) {
                value = effectFn();
                dirty = false;
            }
            track(computedObj, 'value');
            return value;
        }
    };

    return computedObj;
}
