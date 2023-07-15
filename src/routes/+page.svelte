<script>
	import { get } from 'svelte/store';
	import { config } from './Config/Store/Config.js';
	import { dict } from './Config/Store/LoadDict.js';
	import { shuffledDict } from './Config/Store/SortedDict.js';
	import { count } from './CountWords';
	import WordDisplay from './WordDisplay.svelte';
	import Pass from './Pass.svelte';
	let Dict = $dict,
		DictName = $config.dict.dictFile.name,
		Count = 0;
	function switchDict(dict, value) {
		if (value == $config.dict.shuffled) Dict = dict;
		if (!$config.dict.shuffled) {
			DictName = $config.dict.dictFile.name;
		} else {
			DictName = `S-${$config.dict.dictFile.name}`;
		}
		Count = $count[DictName];
	}
	dict.subscribe((i) => {
		switchDict(i, false);
	});
	shuffledDict.subscribe((i) => {
		switchDict(i, true);
	});
	count.subscribe((i) => {
		Count = i[DictName];
	});
</script>

<div class="main">
	<div>
		<div class="last">
			{#if Count - 1 >= 0}
				<WordDisplay {Dict} {Count} offset="-1" />
			{/if}
		</div>
		<div class="pass"><Pass {Dict} {Count} {DictName} /></div>
		<div class="next">
			{#if Count + 2 <= Dict.length}
				<WordDisplay {Dict} {Count} offset="1" />
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		@apply m-0 p-0;
	}
	.main {
		height: calc(100dvh - 3rem);
		@apply flex w-full flex-nowrap content-center items-center justify-center pl-10 pr-10 text-center;
	}
	.main > div {
		@apply flex h-full w-full flex-nowrap content-center items-center justify-center text-center;
	}
	.last,
	.next {
		@apply basis-2/6 opacity-80;
	}
	.last {
		@apply pr-2 text-right;
	}
	.next {
		@apply pl-2 text-left;
	}
	.pass {
		@apply basis-2/3;
	}
</style>
