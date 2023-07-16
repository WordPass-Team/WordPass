<script>
	import { record } from './../Config/Store/Word.js';
	import { sortedDict, importantSortedDict } from '../Config/Store/SortedDict';
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { dict } from '../Config/Store/LoadDict';
	import { count } from '../CountWords';
</script>

<div class="main">
	<table>
		<thead>
			<tr>
				<th>{$_('order')}</th>
				<th>{$_('word')}</th>
				<th>{$_('retry')}</th>
				<th>{$_('passed')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $importantSortedDict as word, index}
				<tr>
					<th>{index + 1}</th>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<th
						><span role="button" tabindex="0" on:click
							>{word.name[0].toUpperCase()}{word.name.slice(1)}</span
						></th
					>
					{#if $record[word.name] && $record[word.name].retry}
						<th>{$record[word.name].retry.length}</th>
					{:else}
						<th>/</th>
					{/if}
					{#if $record[word.name] && $record[word.name].passed}
						<th>{$record[word.name].passed}</th>
					{:else}
						<th>/</th>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	table {
		@apply table;
	}
</style>
