import defaultConfig from './Default/Default.config';
import { config } from './Config';
import createStore from './lib/CreateStore';
import defaultDict from './Default/Default.dict';
import store from './lib/StoreObject';

let Config = defaultConfig;
config.subscribe((result) => {
	Config = result;
});

export const dict = createStore(Config.dict.dictFile.name, defaultDict);

export default async function loadDict() {
	let data = store.get(Config.dict.dictFile.name);
	if (!data) {
		data = await (await fetch(Config.dict.dictFile.src)).json();
	}
	console.log(`Load ${Config.dict.dictFile.name}`);
	dict.set(data);
}
