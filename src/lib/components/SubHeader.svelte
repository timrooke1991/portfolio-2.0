<script>
	import PageTransition from '$lib/transitions/PageTransition.svelte';

	let { title, isSinglePost } = $props();

	let computedTitle = $state('');
	let isWorking = $state(false);

	let dictionary = {
		about: 'About me',
		blog: 'Ramblings',
		contact: 'Get in touch',
		projects: 'Projects',
		fallback: 'opps, you broke it'
	};

	$effect(() => {
		if (title) {
			let modifiedTitle = title ?? '/'; // Use a local variable to avoid reassigning the exported variable directly

			if (modifiedTitle === '/') {
				modifiedTitle = 'Welcome';
			} else if (modifiedTitle[0] === '/') {
				modifiedTitle = dictionary[modifiedTitle.slice(1)] ?? dictionary['fallback'];
			}

			isWorking = false;

			setTimeout(() => {
				isWorking = true;
				computedTitle = modifiedTitle; // Update computedTitle with the modified title
			}, 400);
		}
	});
</script>

<PageTransition refresh={isSinglePost} span={true}>
	{#if !isSinglePost}
		<div class="page-head">
			<div class="heading-wrapper" class:in={isWorking}>
				<span class="comment" aria-hidden="true">/* ---&nbsp;&nbsp;</span>
				<h1>
					<div class="title-wrap">
						{computedTitle}
					</div>
				</h1>
				<span class="comment closing-comment" aria-hidden="true">&nbsp;&nbsp;---*/</span>
			</div>
		</div>
	{/if}
</PageTransition>

<style lang="scss">
	.page-head {
		--transition: transform 0.24s cubic-bezier(0.165, 0.84, 0.44, 1);

		background: transparent;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		contain: layout;
		overflow: hidden;
		position: relative;
		z-index: 0;
		font-size: 1.1rem;
		min-height: 2.2rem;

		.heading-wrapper {
			display: flex;
			position: relative;
			width: auto;

			.comment {
				font-family: var(--codeFont);
				font-weight: normal;
				font-size: 1em;
				line-height: 1.4;
				color: var(--purple);
				background: var(--grey); // for the trnasition effect
				margin: 0 0.1em 0 0;
				z-index: 2;
				position: relative;

				&.closing-comment {
					margin: 0;
					transition: var(--transition);
					transform: translateX(calc(-100% + 96px));
					position: absolute;
					left: 100%;
					width: 100%;
					overflow: visible;
				}
			}

			&.in .closing-comment {
				transform: translateX(0);
			}
		}

		h1 {
			font-size: inherit;
			margin: 0 0.25rem 0 0;
			padding: 0;
			width: max-content;
			font-weight: normal;
			display: flex;
			align-items: center;

			.title-wrap {
				position: relative;
				z-index: 1;
				background: var(--greyLight);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				font-family: var(--codeFont);
				text-transform: lowercase;
				flex: 0 1 auto;
				white-space: nowrap;
				line-height: 1.2;
			}
		}
	}
</style>
