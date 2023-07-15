import localforage from 'localforage';
import { writable, get } from 'svelte/store';
import lodash from 'lodash';

export function createWritableStore(key, defaultValue, assign) {
	console.log(`${key}'s default value: ${JSON.stringify(defaultValue)}`);
	const w = writable(defaultValue);
	const { subscribe, update } = w;
	const storeUpdate = (func) => {
		update(func);
		localforage.setItem(key, get(w));
		console.log(`Updated ${key}: ${JSON.stringify(get(w))}`);
	};
	const storeSet = (i) => {
		storeUpdate(() => i);
	};
	localforage.getItem(key).then((result) => {
		if (result) {
			console.log(`Had ${key}: ${JSON.stringify(result)}`);
			if (assign) {
				storeSet(lodash.assignIn(defaultValue, result));
			} else {
				storeSet(result);
			}
		} else {
			console.log(`Hadn't ${key}. Use Default ${key}: ${JSON.stringify(defaultValue)}`);
			storeSet(defaultValue);
		}
	});
	return {
		subscribe,
		set: storeSet,
		update: storeUpdate
	};
}
