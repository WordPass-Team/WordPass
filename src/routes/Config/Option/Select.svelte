<script>
	import { options } from '../Default.config';
	import { onDestroy } from 'svelte';
	import { config, storeObj } from '../Config';
	import objectPath from 'object-path';
	export let key, info;
	let selectValue = '';
	const destroy = config.subscribe((result) => {
		selectValue = objectPath.get(result, key);
	});
	onDestroy(destroy);
</script>

<div class="main">
	<div class="info">{info}</div>
	<select
		bind:value={selectValue}
		on:change={(e) => {
			config.update((i) => {
				objectPath.set(i, key, e.target.value);
				storeObj.set('config', i);
				console.log(e.target.value);
				console.log(i);
				return i;
			});
			return;
		}}
	>
		{#each objectPath.get(options, key, '') as option}
			<option>{option}</option>
		{/each}
		<option>test</option>
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
		@apply select-bordered select mr-4;
	}
</style>
