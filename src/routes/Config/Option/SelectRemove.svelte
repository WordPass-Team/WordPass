<script>
	import { options } from '../Store/Options';
	import { onDestroy } from 'svelte';
	import { config } from '../Store/Config';
	import objectPath from 'object-path';
	import { _ } from 'svelte-i18n';
	export let key, info;
	let selectValue;
	const destroy = config.subscribe((result) => {
		selectValue = objectPath.get(result, `${key}.name`);
	});
	onDestroy(destroy);
</script>

{#if objectPath.get($options, key, []).length > 0}
	<div class="main">
		<div class="info">{info}</div>
		<form
			on:submit|preventDefault={(e) => {
				options.update((i) => {
					let array = objectPath.get(i, key);
					array.splice(e.target.select.selectedIndex, 1);
					objectPath.set(i, key, array);
					return i;
				});
				return;
			}}
		>
			<select name="select" bind:value={selectValue}>
				{#each objectPath.get($options, key) as option}
					<option>{option.name}</option>
				{/each}
			</select>
			<input name="submit" type="submit" class="btn btn-outline" value={$_('submit')} />
		</form>
	</div>
{/if}

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
		@apply select-bordered select mr-2 w-5/6;
	}
	.btn {
		@apply basis-1/6;
	}
	form {
		@apply flex basis-2/5 flex-nowrap;
	}
</style>
