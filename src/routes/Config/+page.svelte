<script>
	import { _ } from 'svelte-i18n';
	import Checkbox from './Option/Checkbox.svelte';
	import Select from './Option/Select.svelte';
	import TextInput from './Option/TextInput.svelte';
	import SelectRemove from './Option/SelectRemove.svelte';
</script>

<div class="main">
	<h1>{$_('dictionary')}</h1>
	<Checkbox key="dict.shuffled" info={$_('setDictionaryShuffledMode')} />
	<Select
		key="dict.dictFile"
		customKey="dict.customDictFile"
		info={$_('setDictionaryFileLocation')}
	/>
	<TextInput key="dict.customDictFile" info={$_('addDictionaryFile')} />
	<SelectRemove key="dict.customDictFile" info={$_('removeDictionaryFile')} />
	<h1>{$_('audio')}</h1>
	<Checkbox key="audio.beep" info={$_('setTypewriterKeySound')} />
	<Select
		key="audio.beepFile"
		customKey="audio.customBeepFile"
		info={$_('setTypewriterKeySoundFileLocation')}
	/>
	<TextInput key="audio.customBeepFile" info={$_('addTypewriterKeySoundFile')} />
	<SelectRemove key="audio.customBeepFile" info={$_('removeTypewriterKeySoundFile')} />
</div>

<style lang="postcss">
	.main {
		@apply pl-36 pr-36 pt-10;
	}
	h1 {
		@apply pb-5 pt-5 text-3xl font-bold;
	}
</style>
