<script>
	import { onDestroy } from 'svelte';
	import { config } from '../Store/Config';
	import objectPath from 'object-path';
	export let key, info;
	let checkedState = false;
	const destroy = config.subscribe((result) => {
		checkedState = objectPath.get(result, key);
	});
	onDestroy(destroy);
</script>

<div class="main">
	<div class="info">{info}</div>
	<input
		type="checkbox"
		bind:checked={checkedState}
		on:click={(e) => {
			config.update((i) => {
				objectPath.set(i, key, e.target.checked);
				return i;
			});
			return;
		}}
	/>
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
	input {
		@apply toggle;
	}
</style>
