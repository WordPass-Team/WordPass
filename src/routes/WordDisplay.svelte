<script>
	import { dict } from './Config/Store/LoadDict';
	import { currentWordCount } from './CountWords';
	export let offset = 0;
	let wordCount = 0;
	currentWordCount.subscribe((result) => {
		wordCount = Number(result) + Number(offset);
	});
</script>

<div class="main">
	<div class="name">
		{$dict[wordCount].name}
	</div>
</div>

<style lang="postcss">
	.main {
		@apply flex h-full flex-wrap content-center items-center justify-center;
	}
	.name {
		@apply w-full font-mono text-3xl;
	}
</style>
