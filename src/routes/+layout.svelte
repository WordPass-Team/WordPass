<script>
	import 'core-js/stable';
	import 'regenerator-runtime/runtime';
	import '../app.css';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/noto-sans-sc/400.css';
	import '@fontsource/noto-sans-sc/700.css';
	import { addMessages, init, getLocaleFromNavigator, _ } from 'svelte-i18n';
	import zh from '$lib/i18n/lang/zh.yaml';
	import en from '$lib/i18n/lang/en.yaml';
	addMessages('zh', zh);
	addMessages('en', en);
	init({
		fallbackLocale: 'zh-CN',
		initialLocale: getLocaleFromNavigator()
	});
	import { shuffledDict } from './Config/Store/SortedDict';
</script>

<div class="nav">
	<div>
		<div>
			<a href="/" class="logo">{$_('title')}</a>
		</div>
		<div>
			<a href="/WordBook">{$_('wordbook')}</a>
			<a href="/Config">{$_('config')}</a>
		</div>
	</div>
</div>

<slot />

<style lang="postcss">
	:global(html) {
		font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
		@apply m-0 p-0;
	}
	:global(body) {
		@apply m-0 h-full w-full p-0;
	}
	.nav {
		background-color: aliceblue;
		box-shadow: 0 0 2rem #0d6dfd50;
		@apply sticky top-0 flex h-12 w-full flex-nowrap content-center items-center justify-center pl-5 pr-5;
	}
	.nav > div {
		@apply flex w-full flex-nowrap content-center items-center justify-between;
	}
	.nav > div > div {
		@apply inline-block h-full w-fit;
	}
	.logo {
		@apply select-none text-xl font-bold;
	}
	a {
		@apply inline-block pl-2;
	}
</style>
