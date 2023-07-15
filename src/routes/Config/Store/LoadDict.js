import { get } from 'svelte/store';
import { config } from './Config';
import { createWritableStore } from './lib/CreateStore';
import { defaultDict } from './Default/Default.dict';
import { count } from '../../CountWords';
import localforage from 'localforage';

export const dict = createWritableStore(get(config).dict.dictFile.name, defaultDict);

export default async function loadDict(config) {
	let data = await localforage.getItem(config.dict.dictFile.name);
	if (!data) {
		console.log(`Downloading ${config.dict.dictFile.name}`);
		data = await (await fetch(config.dict.dictFile.src)).json();
		if (!get(count)[config.dict.dictFile.name]) {
			count.update((i) => {
				i[config.dict.dictFile.name] = 0;
				return i;
			});
		}
	}
	dict.set(data);
	console.log(`Load ${config.dict.dictFile.name}`);
}

config.subscribe((result) => {
	loadDict(result);
});
