import defaultConfig from './Default.config';
import { writable } from 'svelte/store';

export const storeObj = {
	set: (key, value) => {
		value = JSON.stringify(value);
		localStorage.setItem(key, value);
		return true;
	},
	get: (key) => {
		let value = localStorage.getItem(key);
		value = JSON.parse(value);
		return value;
	}
};

function createConfig() {
	const { subscribe, set, update } = writable();
	let result = storeObj.get('config');
	if (result) {
		set(result);
	} else {
		storeObj.set('config', defaultConfig);
		set(defaultConfig);
	}
	update((i) => {
		i.load = new Date().getTime();
		storeObj.set('config', i);
		return i;
	});
	return {
		subscribe,
		set,
		update
	};
}

export const config = createConfig();
