<script>
	import Analyze from './Analyze.svelte';
	import 'remixicon/fonts/remixicon.css';
	import getWordInfos from './GetWordInfos.js';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/600.css';
	import '@fontsource/noto-sans-sc/500.css';
	import '@loadingio/css-spinner/index.min.css';
	import { importantSortedDict } from '../Config/Store/SortedDict';
	let count = -1,
		matchWords;
	import VirtualList from './VirtualList.svelte';
</script>

<div class="main">
	<div class="search-and-list">
		<div class="control">
			<button
				class="home-button"
				on:click={() => {
					// -1 -> Home
					count = -1;
				}}><i class="ri-home-2-line" /></button
			>
			<input
				type="text"
				class="search"
				on:keyup={(e) => {
					matchWords = e.target.value;
				}}
			/>
		</div>
		<div class="list">
			<VirtualList items={$importantSortedDict} let:item={word} let:index>
				{#if !matchWords || word.name
						.toLowerCase()
						.startsWith(matchWords.toLowerCase()) || String(word.trans)
						.toLowerCase()
						.includes(matchWords.toLowerCase())}
					<div class="word-card">
						<div
							role="button"
							tabindex="0"
							data-index={index}
							on:focus={(e) => {
								count = e.currentTarget.dataset.index;
								console.log($importantSortedDict[count]);
							}}
						>
							<div class="name">{word.name[0].toUpperCase()}{word.name.slice(1)}</div>
							{#if word.ukphone}<div class="phone">BrE /{word.ukphone}/</div>{/if}
							{#if word.usphone}<div class="phone">NAmE /{word.usphone}/</div>{/if}
							{#if word.trans}
								{#each word.trans as trans, index}
									{#if word.trans.length >= 2}<div class="trans">
											{index + 1}. {trans}
										</div>
									{:else}
										<div class="trans">{trans}</div>
									{/if}
								{/each}
							{/if}
						</div>
					</div>
				{/if}
			</VirtualList>
		</div>
	</div>
	<div class="title-and-info">
		{#if count == -1}
			<div class="analyze">
				<Analyze
					on:click={(e) => {
						count = $importantSortedDict.findIndex(
							(obj) => obj.name.toLowerCase() === e.target.innerText.toLowerCase()
						);
						console.log(count);
					}}
				/>
			</div>
		{/if}
		{#if count >= 0}
			{#key count}
				<div class="title">
					<span class="name"
						>{$importantSortedDict[count].name[0].toUpperCase()}{$importantSortedDict[
							count
						].name.slice(1)}</span
					>
					<span class="phone">
						{#if $importantSortedDict[count].ukphone}
							<span>
								BrE /{$importantSortedDict[count].ukphone}/
							</span>{/if}
						{#if $importantSortedDict[count].usphone}
							<span>
								NAmE /{$importantSortedDict[count].usphone}/
							</span>{/if}
					</span>
				</div>
				<div class="word-info">
					<div class="info">
						{#await getWordInfos($importantSortedDict[count].name)}
							<div class="pending" />
						{:then wordInfos}
							{#each wordInfos as wordInfo}
								<h1 class="l1 part-of-speech">{wordInfo.partOfSpeech}</h1>
								{#each wordInfo.definitions as definition}
									{#if definition.definition}
										<div class="l2 definition">
											<h2>Definition</h2>
											<div>
												{@html definition.definition.replaceAll('/wiki/', '//wiktionary.org/wiki/')}
											</div>
										</div>
									{/if}
									{#if definition.parsedExamples}
										<div class="l3 example">
											<h3>Example</h3>
											{#each definition.parsedExamples as example, index}
												{#if definition.parsedExamples.length >= 2}
													<div>
														{index + 1}. {@html example.example.replace(
															'/wiki/',
															'//wiktionary.org/wiki/'
														)}
													</div>
												{:else}
													<div>
														{@html example.example.replace('/wiki/', '//wiktionary.org/wiki/')}
													</div>
												{/if}
											{/each}
										</div>
									{/if}
								{/each}
							{/each}
						{:catch error}
							<div>{error}</div>
						{/await}
					</div>
				</div>
			{/key}
		{/if}
	</div>
</div>

<style lang="postcss">
	.main {
		height: calc(100dvh - 3rem);
		@apply flex pb-10 pl-36 pr-36 pt-10;
	}
	.search-and-list {
		@apply mr-2 flex h-full grow-0 basis-1/3 flex-col;
	}
	.control {
		@apply mb-2 flex w-full;
	}
	.home-button {
		@apply btn-outline btn text-lg;
	}
	.search {
		@apply input-bordered input ml-2 grow;
	}
	.list {
		box-shadow: inset 0 0 5rem white;
		@apply mt-2 h-full overflow-x-hidden overflow-y-hidden;
	}
	.title-and-info {
		@apply flex basis-2/3 flex-col pl-2;
	}
	.analyze {
		@apply h-full overflow-scroll overflow-x-hidden;
	}
	.word-card {
		@apply pb-2 pl-2 pr-2 pt-2;
	}
	.name {
		@apply text-3xl font-bold;
	}
	.phone {
		@apply text-xs;
	}
	.trans {
		@apply text-sm;
	}
	.word-info {
		@apply h-full overflow-scroll overflow-x-hidden;
	}
	.pending {
		@apply flex h-full items-center justify-center opacity-25;
	}
	.title {
		@apply mb-2;
	}
	.title > .name {
		@apply text-4xl font-bold;
	}
	.title > .phone {
		@apply text-base;
	}
	h1 {
		@apply text-2xl font-bold;
	}
	h2 {
		@apply text-xl font-semibold;
	}
	h3 {
		@apply text-lg font-medium;
	}
	.l1 {
		@apply pl-2;
	}
	.l2 {
		@apply pl-4;
	}
	.l3 {
		@apply pl-6;
	}
	.word-info > *[href] {
		@apply underline;
	}
</style>
