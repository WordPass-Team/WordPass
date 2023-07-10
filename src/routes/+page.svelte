<script>
	import { dict, currentWordCount } from './Config/Dict.js';
	import WordDisplay from './WordDisplay.svelte';
	import Pass from './Pass.svelte';
</script>

<div class="main">
	<div>
		<div class="last">
			{#if $currentWordCount - 1 >= 0}
				<WordDisplay offset="-1" />
			{/if}
		</div>
		<div class="pass"><Pass /></div>
		<div class="next">
			{#if $currentWordCount + 2 <= $dict.length}
				<WordDisplay offset="1" />
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		@apply m-0 p-0;
	}
	.main {
		height: calc(100dvh - 2.5rem);
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
		perspective-origin: 10rem;
		transform: perspective(20rem) rotateY(5deg);
		transform-origin: right;
		@apply pr-8 text-right;
	}
	.next {
		perspective-origin: -10rem;
		transform: perspective(20rem) rotateY(-5deg);
		transform-origin: left;
		@apply pl-8 text-left;
	}
	.pass {
		@apply basis-2/3;
	}
</style>
