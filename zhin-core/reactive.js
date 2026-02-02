/**
 * ZhinStack Reactive Engine
 * Implements Signals and Proxy-based reactivity.
 */

let activeEffect = null;

export function createSignal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();

    const read = () => {
        if (activeEffect) {
            subscribers.add(activeEffect);
        }
        return value;
    };

    const write = (newValue) => {
        if (value !== newValue) {
            value = newValue;
            // Run subscribers. Copy to avoid infinite loops if effect modifies signal?
            // Usually not an issue for simple signals unless cycle.
            [...subscribers].forEach(sub => sub());
        }
    };

    return [read, write];
}

export function createEffect(fn) {
    const effect = () => {
        const prevEffect = activeEffect;
        activeEffect = effect;
        try {
            fn();
        } finally {
            activeEffect = prevEffect;
        }
    };
    effect();
    return effect; // return runner just in case
}

export function reactive(target) {
    const subs = new Map(); // key -> Set<effect>

    return new Proxy(target, {
        get(obj, prop) {
            if (activeEffect) {
                let propSubs = subs.get(prop);
                if (!propSubs) {
                    propSubs = new Set();
                    subs.set(prop, propSubs);
                }
                propSubs.add(activeEffect);
            }
            return obj[prop];
        },
        set(obj, prop, val) {
            obj[prop] = val;
            const propSubs = subs.get(prop);
            if (propSubs) {
                propSubs.forEach(effect => effect());
            }
            return true;
        }
    });
}
