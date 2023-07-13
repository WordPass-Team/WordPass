import StoreObject from './StoreObject';
import { writable, get } from 'svelte/store';

export default function createStore(key, defaultValue) {
	const w = writable(defaultValue);
	const { subscribe, set, update } = w;
	const storeUpdate = function (func) {
		update(func);
		StoreObject.set(key, get(w));
		console.log(`Update`);
	};
	const storeSet = function (i) {
		storeUpdate(() => i);
		console.log(`Set`);
	};
	const result = StoreObject.get(key);
	if (result) {
		set(result);
	} else {
		set(defaultValue);
	}
	return {
		subscribe,
		set: storeSet,
		update: storeUpdate
	};
}
