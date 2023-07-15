<script>
	import { defaultDict } from './Config/Store/Default/Default.dict';
	export let Dict = defaultDict,
		Count = 0;
	export let offset = 0;
	let wordCount = 0;
	$: wordCount = Number(Count) + Number(offset);
</script>

{#if Dict[wordCount]}
	<div class="main">
		<div class="name">
			{Dict[wordCount].name}
		</div>
	</div>
{/if}

<style lang="postcss">
	.main {
		@apply flex h-full flex-wrap content-center items-center justify-center;
	}
	.name {
		@apply w-full font-mono text-3xl;
	}
</style>
