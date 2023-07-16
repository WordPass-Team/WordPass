<script>
	import { record } from './Config/Store/Word.js';
	import { config } from './Config/Store/Config';
	import { count } from './CountWords';
	import { Howl } from 'howler';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/700.css';
	import { defaultDict } from './Config/Store/Default/Default.dict.js';

	export let Dict = defaultDict,
		Count = 0,
		DictName;
	function makeUntyped(l) {
		let untyped = '_';
		while (untyped.length < l) {
			untyped = untyped + '_';
		}
		return untyped;
	}
	let typed = '',
		untyped = makeUntyped(Dict[Count].name.length),
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
			} else if (event.which >= 65 && event.which <= 90 && typed.length < Dict[Count].name.length) {
				typed = typed + event.key;
			}
			if (!mouseState) {
				untyped = makeUntyped(Dict[Count].name.length).slice(typed.length);
			} else {
				untyped = Dict[Count].name.slice(typed.length);
			}
		}
	}
	function check() {
		let Typed = typed,
			result = false;
		if ($config.input.ignoreCase) {
			result = Typed.toLowerCase() == Dict[Count].name.toLowerCase();
		} else {
			result = Typed == Dict[Count].name;
		}
		if (result) {
			// Pass!
			record.update((i) => {
				if (!i[Dict[Count].name]) {
					i[Dict[Count].name] = {};
				}
				i[Dict[Count].name].passed = true;
				console.log(`Pass! ${JSON.stringify(i)}`);
				return i;
			});
			count.update((now) => {
				now[DictName] = Number(now[DictName]) + 1;
				console.log(`Count: ${now}`);
				return now;
			});
			// Clear
			typed = '';
			untyped = makeUntyped(Dict[Count].name.length).slice(typed.length);
		} else if (Typed.length == Dict[Count].name.length) {
			// Retry!
			record.update((i) => {
				if (!i[Dict[Count].name]) {
					i[Dict[Count].name] = {};
					i[Dict[Count].name].retry = [new Date().getTime()];
				}
				i[Dict[Count].name].retry.push(new Date().getTime());
				if (i[Dict[Count].name].passed) i[Dict[Count].name].passed = false;
				console.log(`Retry! ${JSON.stringify(i)}`);
				return i;
			});
			console.log(Dict[Count]);
			// Clear
			typed = '';
			untyped = makeUntyped(Dict[Count].name.length).slice(typed.length);
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

{#if Dict[Count]}
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div class="main">
		<div class="phone">
			{#if Dict[Count].ukphone}<span class="phone">
					BrE /{Dict[Count].ukphone}/
				</span>
			{/if}
			{#if Dict[Count].usphone}
				<span class="phone">
					NAmE /{Dict[Count].usphone}/
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
				style={checkControlerVisibility(!(Count - 1 >= 0))}
				role="button"
				tabindex="0"
				on:click={() => {
					count.update((now) => {
						now[DictName] = Number(now[DictName]) - 1;
						console.log(now);
						return now;
					});
					typed = '';
					untyped = makeUntyped(Dict[Count].name.length).slice(typed.length);
				}}>{`<`}</span
			>
			<span><span class="typed">{typed}</span><span class={untypedClassName}>{untyped}</span></span>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				style={checkControlerVisibility(!(Count + 2 <= Dict.length))}
				role="button"
				tabindex="0"
				on:click={() => {
					count.update((now) => {
						now[DictName] = Number(now[DictName]) + 1;
						console.log(now);
						return now;
					});
					typed = '';
					untyped = makeUntyped(Dict[Count].name.length).slice(typed.length);
				}}>{`>`}</span
			>
		</div>
		{#if Dict[Count].trans}
			<div class="trans">
				{#each Dict[Count].trans as trans, index}
					{#if Dict[Count].trans.length >= 2}
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
{/if}

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
