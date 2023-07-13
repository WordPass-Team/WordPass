import objectPath from 'object-path';
import { config } from '../Config/Store/Config';
import { get } from 'svelte/store';

export default async function getWordInfos(name) {
	const word = await (
		await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${name}?origin=*`)
	).json();
	const lang = await get(config).dict.dictFile.language;
	return await objectPath.get(word, lang);
}
