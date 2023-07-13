<script>
	import { config } from './Config/Store/Config';
	import { currentWordCount } from './CountWords';
	import { Howl } from 'howler';
	import { dict } from './Config/Store/LoadDict';
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
		if (exp) return 'filter: opacity(0.2); pointer-events: none';
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
		let Typed = typed,
			result = false;
		if ($config.input.ignoreCase) {
			result = Typed.toLowerCase() == $dict[$currentWordCount].name.toLowerCase();
		} else {
			result = Typed == $dict[$currentWordCount].name;
		}
		if (result) {
			// Pass!
			$dict[$currentWordCount].passed = true;
			currentWordCount.update((now) => {
				now = now + 1;
				return now;
			});
			console.log($dict[$currentWordCount]);
			// Clear
			typed = '';
			untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
		} else if (Typed.length == $dict[$currentWordCount].name.length) {
			// Retry!
			dict.update((i) => {
				if (i[$currentWordCount].passed) i[$currentWordCount].passed = false;
				if (!i[$currentWordCount].retry) i[$currentWordCount].retry = [];
				i[$currentWordCount].retry.push(new Date().getTime());
				return i;
			});
			console.log($dict[$currentWordCount]);
			// Clear
			typed = '';
			untyped = makeUntyped($dict[$currentWordCount].name.length).slice(typed.length);
		}
	}
	async function beep() {
		if ($config.audio.beep) {
			new Howl({
				src: [$config.audio.beepFile.src]
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
	<div class="phone">
		{#if $dict[$currentWordCount].ukphone}<span class="phone">
				BrE /{$dict[$currentWordCount].ukphone}/
			</span>
		{/if}
		{#if $dict[$currentWordCount].usphone}
			<span class="phone">
				NAmE /{$dict[$currentWordCount].usphone}/
			</span>
		{/if}
	</div>
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
		<span><span class="typed">{typed}</span><span class={untypedClassName}>{untyped}</span></span>
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
	{#if $dict[$currentWordCount].trans}
		<div class="trans">
			{#each $dict[$currentWordCount].trans as trans, index}
				{#if $dict[$currentWordCount].trans.length >= 2}
					<div class="tran">
						{index + 1}. {trans}
					</div>
				{:else}
					<div class="tran">{trans}</div>
				{/if}
			{/each}
		</div>
	{/if}
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
	.phone {
		@apply h-10 pb-4 text-lg;
	}
	.trans {
		@apply h-10 pt-4 text-left text-lg;
	}
</style>
