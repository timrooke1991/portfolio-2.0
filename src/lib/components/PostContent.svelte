<script>
	let { content } = $props();
	import { onMount } from 'svelte';
	
	let firstHeader = $state(null);
	let lastHeader = $state(null);
	let headers = $state([]);
	let scrollLine = $state({ height: 0, visible: false });
	let activeHeaders = $state(new Set());
	let visibleHeaders = $state(new Set());
	
	$effect(() => {
		const handleScroll = () => {
			if (!firstHeader || !lastHeader) return;
			
			const headerTop = firstHeader.offsetTop + 10;
			const lastHeaderBottom = lastHeader.offsetTop + lastHeader.offsetHeight;
			const scrollPosition = window.scrollY;
			
			if (scrollPosition >= headerTop) {
				scrollLine.visible = true;
				const maxHeight = lastHeaderBottom - headerTop;
				const currentHeight = Math.max(0, scrollPosition - headerTop);
				scrollLine.height = Math.min(currentHeight, maxHeight);
				
				const newVisible = new Set();
				const newActive = new Set();

				headers.forEach(header => {
					const lineBottom = headerTop + currentHeight;
					
					if (lineBottom >= header.offsetTop) {
						newVisible.add(header);
						
						if (scrollPosition + 50 >= header.offsetTop) {
							newActive.add(header);
						}
					}
				});

				visibleHeaders = newVisible;
				activeHeaders = newActive;
			} else {
				scrollLine.visible = false;
				scrollLine.height = 0;
				visibleHeaders = new Set();
				activeHeaders = new Set();
			}
		};

		onMount(() => {
			headers = Array.from(document.querySelectorAll('.markdown-content h2, .markdown-content h3, .markdown-content h4'));
			firstHeader = headers[0];
			lastHeader = headers[headers.length - 1];
			
			window.addEventListener('scroll', handleScroll);
			setTimeout(handleScroll, 0);
			
			return () => window.removeEventListener('scroll', handleScroll);
		});
	});
</script>

<div class="markdown-content">
	{#if scrollLine.visible}
		<div 
			class="scroll-line" 
			style:height="{scrollLine.height}px"
			style:top="{firstHeader.offsetTop}px"
		/>
		{#each headers as header}
			{#if visibleHeaders.has(header)}
				<div 
					class="header-marker" 
					class:active={activeHeaders.has(header)}
					style:top="{header.offsetTop + (header.offsetHeight / 2) - 9}px"
				/>
			{/if}
		{/each}
	{/if}
	<svelte:component this={content} />
</div>

<style lang="scss">
	.markdown-content {
		position: relative;
	}

	.scroll-line {
		position: absolute;
		margin-left: calc(calc(var(--quarterNote) + 4px) * -1);
		width: 4px;
		background: var(--yellow);
		opacity: 1;
		transition: height 0.1s linear;
		padding-top: 10px;

		@media (max-width: 768px) {
			display: none;
		}
	}

	.header-marker {
		position: absolute;
		left: calc(calc(var(--quarterNote) + 4px) * -1);
		margin-left: -7px;
		width: 18px;
		height: 18px;
		border-radius: 9px;
		border: 2px solid var(--yellow);
		background-color: var(--darkGray);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		animation: appear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center;

		&.active {
			background-color: var(--yellow);
		}

		@media (max-width: 768px) {
			display: none;
		}
	}

	@keyframes appear {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	
	.markdown-content :global(.yellow) {
		color: var(--yellow);
	}

	.markdown-content :global(.visible) {
		&::before {
			opacity: 0.5;
			transform: scaleY(1);
		}
	}
	
	.markdown-content :global(.squiggly-red) {
		text-decoration-line: underline;
		text-decoration-style: wavy;
		text-decoration-color:#f06a82;
		text-decoration-thickness: 1px;
		/* Fallback for browsers that don't support wavy */
		@supports not (text-decoration-style: wavy) {
			background-image: url("data:image/svg+xml,%3Csvg width='80' height='8' viewBox='0 0 80 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3C10 3 10 5 20 5C30 5 30 3 40 3C50 3 50 5 60 5C70 5 70 3 80 3' stroke='%23e6002a' stroke-width='1.5'/%3E%3C/svg%3E");
			background-position: bottom;
			background-repeat: repeat-x;
			background-size: 40px 4px;
			padding-bottom: 3px;
		}
	}

	.markdown-content :global(.squiggly-yellow) {
		background: linear-gradient(45deg, transparent 45%, #ffd100 45%, #ffd100 55%, transparent 55%);
		background-size: 0.5em 0.5em;
		background-repeat: repeat-x;
		background-position: 0 90%;
	}
	
	.markdown-content :global(h2),
	.markdown-content :global(h3),
	.markdown-content :global(h4) {
		position: relative;
		margin-left: calc(calc(var(--quarterNote) + 4px) * -1);
		padding-left: var(--quarterNote);
		border-left: 4px solid var(--yellow);

		@media (max-width: 768px) {
			margin-left: 0;
		}
	}

	.markdown-content :global(ul) {
		list-style: none;
		margin-left: 0.25rem;
	}

	.markdown-content :global(ul li) {
		line-height: 1.5;
		margin-bottom: 0.5rem;
		color: var(--offWhite);
	}

	.markdown-content :global(ul li::before) {
		content: ">";
		color: var(--lightGray);
		font-weight: bold;
		display: inline-block;
		width: 1em;
		line-height: 1.5;
		margin-left: -1em;
	}

	.markdown-content :global(p) {
		margin-bottom: 1rem;
		color: var(--offWhite);
		line-height: 1.5;
	}

	.markdown-content :global(pre),
	.markdown-content :global(pre[class*=language-]) {
		position: relative;
		background: var(--darkGray);
		border-radius: 0.75rem;
		padding: 3rem 1.5rem 1.5rem;
		margin: 2rem 0;
		overflow-x: auto;
		font-family: var(--monoFont);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.25),
			0 4px 8px rgba(0, 0, 0, 0.08),
			inset 0 0 20px rgba(0, 0, 0, 0.15);

		

		/* Terminal-style dots */
		&::before {
			content: '';
			position: absolute;
			top: 1rem;
			left: 1rem;
			display: inline-block;
			width: 0.75rem;
			height: 0.75rem;
			border-radius: 50%;
			background: #ff5f56;
			box-shadow:
				1.25rem 0 0 #ffbd2e,
				2.5rem 0 0 #27c93f;
		}
	}
</style>
