<script>
	import { _ } from 'svelte-i18n';
	import Checkbox from './Option/Checkbox.svelte';
	import Select from './Option/Select.svelte';
</script>

<div class="main">
	<h1>{$_('audio')}</h1>
	<Checkbox key="audio.beep" info={$_('setTypewriterKeySound')} />
	<Select key="audio.beepSrc" info={$_('setTypewriterKeySoundFileLocation')} />
</div>

<style lang="postcss">
	.main {
		@apply ml-36 mr-36 mt-10;
	}
	h1 {
		@apply mb-5 mt-5 text-3xl font-bold;
	}
</style>
