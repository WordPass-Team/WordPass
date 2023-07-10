<script>
	import '../app.css';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import Bowser from 'bowser';
	import { addMessages, init, getLocaleFromNavigator, _ } from 'svelte-i18n';
	import zhCN from '$lib/i18n/lang/zh-CN.yaml';
	import enUS from '$lib/i18n/lang/en-US.yaml';
	addMessages('zh-CN', zhCN);
	addMessages('zh', zhCN);
	addMessages('en-US', enUS);
	addMessages('en', enUS);
	init({
		fallbackLocale: 'zh-CN',
		initialLocale: getLocaleFromNavigator()
	});
	let browserInfo = Bowser.getParser(window.navigator.userAgent),
		browserNotSupport = false;
	console.log(
		`Browser: ${browserInfo.getEngineName()} ${browserInfo.getBrowserVersion().split('.', 1)[0]}`
	);
	if (
		!(
			(browserInfo.getBrowserVersion().split('.', 1)[0] >= 114 &&
				browserInfo.getEngineName().toLowerCase() == 'blink') ||
			(browserInfo.getBrowserVersion().split('.', 1)[0] >= 101 &&
				browserInfo.getEngineName().toLowerCase() == 'gecko') ||
			(browserInfo.getBrowserVersion().split('.', 2)[0] +
				'.' +
				browserInfo.getBrowserVersion().split('.', 2)[1] >=
				15.4 &&
				browserInfo.getEngineName().toLowerCase() == 'webkit')
		)
	) {
		browserNotSupport = true;
	}
</script>

<div class="nav">
	<div>
		<div>
			<a href="/" class="logo">{$_('title')}</a>
			{#if browserNotSupport}
				<div>{$_(browserNotSupport)}</div>
			{/if}
		</div>
		<div><a href="/Config">{$_('config')}</a></div>
	</div>
</div>

<slot />

<style lang="postcss">
	:global(html) {
		font-family: 'IBM Plex Sans', sans-serif;
		@apply m-0 p-0;
	}
	:global(body) {
		@apply m-0 h-full w-full p-0;
	}
	.nav {
		background-color: aliceblue;
		box-shadow: 0 0 10rem #0d6efd;
		@apply sticky top-0 flex h-10 w-full flex-nowrap content-center items-center justify-center pl-5 pr-5;
	}
	.nav > div {
		@apply flex w-full flex-nowrap content-center items-center justify-between;
	}
	.nav > div > div {
		@apply inline-block h-full w-fit;
	}
	.logo {
		@apply select-none font-bold;
	}
</style>
