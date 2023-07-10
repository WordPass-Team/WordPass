<script>
	import { config } from './Config/Config';
	import { Howl } from 'howler';
	import { dict } from './Config/Dict';
	import { currentWordCount } from './Config/Dict';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/700.css';

	function makeUntyped(l) {
		let untyped = '_';
		while (untyped.length < l) {
			untyped = untyped + '_';
		}
		return untyped;
	}
	let typed = '',
		untyped = makeUntyped($dict[$currentWordCount].name.length),
		mouseState = false,
		untypedClassName = 'untyped';
	function checkControlerVisibility(exp) {
		if (exp) return 'visibility: hidden';
		return '';
	}
	async function type(event) {
		if (!event || (event.which >= 65 && event.which <= 90) || event.which == 8) {
			if (!event) event = false;
			if (event.which == 8) {
				typed = typed.slice(0, -1);
			} else if (
				event.which >= 65 &&
				event.which <= 90 &&
				typed.length < $dict[$currentWordCount].name.length
			) {
				typed = typed + event.key;
			}
			if (!mouseState) {
				untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
			} else {
				untyped = $dict[$currentWordCount].name.slice(typed.length);
			}
		}
	}
	function check() {
		let Typed = typed;
		if ($config.input.ignoreCase) Typed = Typed.toLowerCase();
		if (Typed === $dict[$currentWordCount].name) {
			console.log('Good!');
			currentWordCount.update((now) => {
				now = now + 1;
				return now;
			});
			typed = '';
			untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
		} else if (Typed.length === $dict[$currentWordCount].name.length) {
			console.log('Not Good.');
			typed = '';
			untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
		}
	}
	async function beep() {
		if ($config.audio.beep) {
			new Howl({
				src: [$config.audio.beepSrc]
			}).play();
			console.log('beep!');
		}
	}
</script>

<svelte:body
	role="textbox"
	tabindex="0"
	on:keydown={(e) => {
		type(e);
		beep();
	}}
	on:keyup={check}
/>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="main">
	<div
		class="input"
		role="textbox"
		tabindex="0"
		on:mouseover={() => {
			mouseState = true;
			type();
			untypedClassName = 'untyped untyped-hover';
		}}
		on:mouseleave={() => {
			mouseState = false;
			type();
			untypedClassName = 'untyped';
		}}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			style={checkControlerVisibility(!($currentWordCount - 1 >= 0))}
			role="button"
			tabindex="0"
			on:click={() => {
				$currentWordCount = $currentWordCount - 1;
				typed = '';
				untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
			}}>{`<`}</span
		>
		<span class="typed">{typed}</span><span class={untypedClassName}>{untyped}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			style={checkControlerVisibility(!($currentWordCount + 2 <= $dict.length))}
			role="button"
			tabindex="0"
			on:click={() => {
				$currentWordCount = $currentWordCount + 1;
				typed = '';
				untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
			}}>{`>`}</span
		>
	</div>
	<div class="trans">{$dict[$currentWordCount].trans}</div>
</div>

<style lang="postcss">
	.main {
		@apply flex flex-col flex-nowrap content-center items-center justify-center text-center;
	}
	.input {
		font-family: 'IBM Plex Mono', monospace;
		@apply select-none border-none text-center text-5xl caret-transparent outline-none;
	}
	.typed {
	}
	.untyped {
	}
	.untyped-hover {
		@apply opacity-50;
	}
	.trans {
		@apply mt-2 h-10 text-lg;
	}
</style>
