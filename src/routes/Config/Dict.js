import defaultConfig from './Default.config';
import { config } from './Config';
import exampleDict from './Dict.example';
import { writable } from 'svelte/store';

let Config = defaultConfig;
config.subscribe((result) => {
	Config = result;
});

export const dict = writable(exampleDict);
export const currentWordCount = writable(0);

function shuffleArray(array) {
	let currentIndex = array.length,
		randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

async function loadDict() {
	let data = await (await fetch(Config.dict.dictSrc)).json();
	if (Config.dict.shuffle) {
		data = await shuffleArray(data);
	}
	dict.set(data);
}

loadDict();
