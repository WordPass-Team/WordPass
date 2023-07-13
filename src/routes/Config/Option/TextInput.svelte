<script>
	import { options } from '../Store/Options';
	import { onDestroy } from 'svelte';
	import { config } from '../Store/Config';
	import objectPath from 'object-path';
	import { _ } from 'svelte-i18n';
	export let key, info;
	let inputSrc, inputName;
	const destroy = config.subscribe(() => {});
	onDestroy(destroy);
</script>

<div class="main">
	<div class="info">{info}</div>
	<form
		on:submit|preventDefault={() => {
			options.update((i) => {
				const obj = {
					name: inputName,
					src: inputSrc
				};
				objectPath.push(i, key, obj);
				inputName = inputSrc = '';
				return i;
			});
			return;
		}}
	>
		<input
			required
			placeholder={$_('name')}
			bind:value={inputName}
			type="text"
			class="input input-bordered name"
		/>
		<input
			required
			placeholder={$_('src')}
			bind:value={inputSrc}
			type="url"
			class="input input-bordered src"
		/>
		<input type="submit" class="btn btn-outline" value={$_('submit')} />
	</form>
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
	.input {
		@apply mr-2;
	}
	.name {
		@apply w-3/12;
	}
	.src {
		@apply w-9/12;
	}
	.btn {
		@apply basis-1/6;
	}
	form {
		@apply flex basis-2/5 flex-nowrap;
	}
</style>
