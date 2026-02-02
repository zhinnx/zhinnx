import { createSignal, createEffect, reactive } from '../zhin-core/reactive.js';
import assert from 'assert';

console.log("Running Reactivity Tests...");

// Test 1: Signals
const [count, setCount] = createSignal(0);
assert.strictEqual(count(), 0);
setCount(1);
assert.strictEqual(count(), 1);
console.log("  - Signals read/write work");

// Test 2: Effects
let doubleCount = 0;
createEffect(() => {
    doubleCount = count() * 2;
});
assert.strictEqual(doubleCount, 2); // Initial run (1 * 2)

setCount(5);
assert.strictEqual(doubleCount, 10); // Updated run (5 * 2)
console.log("  - Effects track dependencies");

// Test 3: Reactive Object
const state = reactive({ name: 'Zhin', age: 1 });
let info = '';

createEffect(() => {
    info = `${state.name} is ${state.age}`;
});

assert.strictEqual(info, 'Zhin is 1');

state.age = 2;
assert.strictEqual(info, 'Zhin is 2');

state.name = 'Stack';
assert.strictEqual(info, 'Stack is 2');
console.log("  - Reactive objects work");

console.log("Reactivity Tests Passed!");
