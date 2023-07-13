<script>
	import { options } from '../Store/Options';
	import { onDestroy } from 'svelte';
	import { config } from '../Store/Config';
	import objectPath from 'object-path';
	export let key, customKey, info;
	let selectValue;
	const destroy = config.subscribe((result) => {
		selectValue = objectPath.get(result, `${key}.name`);
	});
	onDestroy(destroy);
</script>

<div class="main">
	<div class="info">{info}</div>
	<select
		bind:value={selectValue}
		on:change={(e) => {
			config.update((i) => {
				objectPath.set(i, key, objectPath.get($options, key)[e.target.selectedIndex]);
				return i;
			});
			return;
		}}
	>
		{#each objectPath.get($options, key) as option}
			<option>{option.name}</option>
		{/each}
		{#if objectPath.get($options, customKey)}
			{#each objectPath.get($options, customKey) as option}
				{#if option.name}
					<option>{option.name}</option>
				{/if}
			{/each}
		{/if}
	</select>
</div>

<style lang="postcss">
	.main {
		@apply mb-3 mt-3 flex h-12 justify-between;
	}
	* {
		display: block;
	}
	.info {
		@apply flex items-center;
	}
	select {
		@apply select-bordered select w-2/5;
	}
	option {
		@apply max-w-5xl;
	}
</style>
