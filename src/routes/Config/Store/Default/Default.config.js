import { defaultOptions } from './Default.options.js';

export const defaultConfig = {
	audio: {
		beep: defaultOptions.audio.beep[0],
		beepFile: defaultOptions.audio.beepFile[0]
	},
	dict: {
		shuffled: defaultOptions.dict.shuffled[0],
		dictFile: defaultOptions.dict.dictFile[0]
	},
	input: {
		ignoreCase: defaultOptions.input.ignoreCase[0]
	}
};
