<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let yIn = 12;
	let yOut = -12;

	let { refresh, span, transitionIn, transitionOut } = $props();
</script>

{#key refresh}
	<div
		class="transition-wrapper"
		class:span
		in:fly={{
			y: yIn,
			duration: transitionIn ? 360 : 0,
			delay: transitionIn ? 360 : 0,
			easing: cubicOut
		}}
		out:fly={{
			y: yOut,
			duration: transitionOut ? 360 : 0,
			easing: cubicIn
		}}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	.transition-wrapper {
		&.span {
			grid-column: 1 / -1;
			grid-row: 1 / 2;
		}
	}
</style>
