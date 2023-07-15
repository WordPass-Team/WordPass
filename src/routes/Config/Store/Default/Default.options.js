import { dictionaryResources } from '../../../../lib/dictionary.js';

export const defaultOptions = {
	audio: {
		beep: [true, false],
		beepFile: [
			{
				name: 'Alpacas',
				src: '/sounds/key-sound/Alpacas.mp3'
			},
			{
				name: 'Buckling Spring',
				src: '/sounds/key-sound/Buckling Spring.mp3'
			},
			{
				name: 'Cherry MX Blacks',
				src: '/sounds/key-sound/Cherry MX Blacks.mp3'
			},
			{
				name: 'Cherry MX Blues',
				src: '/sounds/key-sound/Cherry MX Blues.mp3'
			},
			{
				name: 'Cherry MX Browns',
				src: '/sounds/key-sound/Cherry MX Browns.mp3'
			},
			{
				name: 'Gateron Black Inks',
				src: '/sounds/key-sound/Gateron Black Inks.mp3'
			},
			{
				name: 'Gateron Red Inks',
				src: '/sounds/key-sound/Gateron Red Inks.mp3'
			},
			{
				name: 'Holy Pandas',
				src: '/sounds/key-sound/Holy Pandas.mp3'
			},
			{
				name: 'Kailh Box Navies',
				src: '/sounds/key-sound/Kailh Box Navies.mp3'
			},
			{
				name: 'NovelKeys Creams',
				src: '/sounds/key-sound/NovelKeys Creams.mp3'
			},
			{
				name: 'SKCM Blue Alps',
				src: '/sounds/key-sound/SKCM Blue Alps.mp3'
			},
			{
				name: 'Topre',
				src: '/sounds/key-sound/Topre.mp3'
			},
			{
				name: 'Turquoise Tealios',
				src: '/sounds/key-sound/Turquoise Tealios.mp3'
			}
		]
	},
	dict: {
		shuffled: [true, false],
		dictFile: dictionaryResources
	},
	input: {
		ignoreCase: [true, false]
	},
	load: [true, false]
};
