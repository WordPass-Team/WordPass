import localforage from 'localforage';
import { count } from '../../CountWords';
import { config } from './Config';
import { createWritableStore } from './lib/CreateStore';
import { derived, get } from 'svelte/store';
import { dict } from './LoadDict';
import shuffleArray from './lib/ShuffleArray';
import { defaultDict } from './Default/Default.dict';
import { record } from './Word';

let Config, Record;
config.subscribe((result) => {
	Config = result;
});
record.subscribe((result) => {
	Record = result;
});

export const shuffledDict = createWritableStore(`S-${Config.dict.dictFile.name}`, defaultDict);

export const sortedDict = derived(dict, (i) => {
	i = i.toSorted((a, b) => {
		const A = String(a.name).toLowerCase();
		const B = String(b.name).toLowerCase();
		if (A < B) return -1;
		if (A > B) return 1;
		return 0;
	});
	return i;
});

export const importantSortedDict = derived(sortedDict, (i) => {
	i = i.toSorted((a, b) => {
		let A, Ap, B, Bp;
		if (Record[a.name] && Record[a.name].retry) {
			A = Record[a.name].retry.length;
			Ap = Boolean(Record[a.name].passed);
		} else {
			A = 0;
			Ap = false;
		}
		if (Record[b.name] && Record[b.name].retry) {
			B = Record[b.name].retry.length;
			Bp = Boolean(Record[b.name].passed);
		} else {
			B = 0;
			Bp = false;
		}
		if ((Ap && Bp) || (!Ap && !Bp)) {
			if (A > B) return -1;
			if (A < B) return 1;
		} else {
			if (Ap > Bp) {
				return 1;
			}
			if (Ap < Bp) {
				return -1;
			}
		}
		return 0;
	});
	return i;
});

dict.subscribe((i) => {
	localforage.getItem(`S-${get(config).dict.dictFile.name}`).then((result) => {
		if (result && result.length == get(dict).length) {
			console.log(`Shuffled: ${get(config).dict.dictFile.name}`);
			return result;
		} else {
			shuffledDict.update((v) => {
				if (!get(count)[get(config).dict.dictFile.name]) {
					count.update((i) => {
						i[`S-${get(config).dict.dictFile.name}`] = 0;
						return i;
					});
				}
				v = shuffleArray(i);
				return v;
			});
		}
	});
});
