<script>
	import { onDestroy } from 'svelte';
	import { dict } from '../Config/Store/LoadDict.js';
	import 'remixicon/fonts/remixicon.css';
	import getWordInfos from './GetWordInfos.js';
	let sortedDict,
		currentWordCount = 0,
		matchWords;
	const destroy = dict.subscribe((result) => {
		sortedDict = result.toSorted((a, b) => {
			const A = String(a.name).toLowerCase();
			const B = String(b.name).toLowerCase();
			if (A < B) return -1;
			if (A > B) return 1;
			return 0;
		});
	});
	onDestroy(destroy);
</script>

<div class="main">
	<div class="search-and-list">
		<div class="control">
			<button
				class="home-button"
				on:click={() => {
					// -1 -> Home
					currentWordCount = -1;
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
			{#each sortedDict as word, index}
				{#if !matchWords || word.name
						.toLowerCase()
						.startsWith(matchWords.toLowerCase()) || String(word.trans)
						.toLowerCase()
						.includes(matchWords.toLowerCase())}
					<div class="word">
						<div
							role="button"
							tabindex="0"
							data-index={index}
							on:focus={(e) => {
								currentWordCount = e.currentTarget.dataset.index;
								console.log(sortedDict[currentWordCount]);
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
			{/each}
		</div>
	</div>
	<div class="info">
		{#if currentWordCount == -1}
			<div class="analyze">e</div>
		{/if}
		{#if currentWordCount >= 0}
			{#key currentWordCount}
				<div class="word-info">
					<div class="name">
						{sortedDict[currentWordCount].name[0].toUpperCase()}{sortedDict[
							currentWordCount
						].name.slice(1)}
					</div>
					{#await getWordInfos(sortedDict[currentWordCount].name)}
						<div class="pending">Pending...</div>
					{:then wordInfos}
						{#each wordInfos as wordInfo}
							<h1 class="part-of-speech">{wordInfo.partOfSpeech}</h1>
							{#each wordInfo.definitions as definition}
								<div class="definition">
									<h2>Definition</h2>
									<div>{@html definition.definition}</div>
								</div>
								{#if definition.parsedExamples}
									<div class="example">
										<h3>Example</h3>
										{#each definition.parsedExamples as example}
											<div>{@html example.example}</div>
										{/each}
									</div>
								{/if}
							{/each}
						{/each}
					{:catch error}
						<div>{error}</div>
					{/await}
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
		@apply mr-2 flex h-full w-full basis-2/6 flex-col;
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
		@apply mt-2 h-full overflow-scroll overflow-x-hidden;
	}
	.info {
		@apply basis-4/6;
	}
	.word {
		@apply pb-2 pl-2 pr-2 pt-2 opacity-80 hover:opacity-100;
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
		@apply h-full overflow-scroll overflow-x-hidden pl-2;
	}
	h1 {
		@apply text-2xl;
	}
	h2 {
		@apply text-xl;
	}
	h3 {
		@apply text-lg;
	}
</style>
