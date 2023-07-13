export default async function getWordInfos(name) {
	const word = await (
		await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${name}?origin=*`)
	).json();
	console.log(word);
	return word.en;
}
