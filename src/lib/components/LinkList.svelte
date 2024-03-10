<script>
	let { links } = $props();
</script>

<nav class="menu menu--highlight">
	{#each links as link}
		<a class="menu__item" href={link.href} target={link.target}>
			<span class="menu__item-name">{link.name}</span>
            {#if link.label}
                <span class="menu__item-label">{link.label}</span>
            {/if}
		</a>
	{/each}
</nav>

<style>
	.menu {
		position: relative;
		max-width: 38em;
		margin-top: var(--halfNote);
	}

	.menu__item {
		position: relative;
		display: block;
		outline: none;
		text-decoration: none;
		margin: 0 0 1.5em;
		line-height: 1;
	}

	.menu__item-name,
	.menu__item-label {
		position: relative;
		display: inline-block;
	}

	.menu__item-name {
		font-size: 1em;
	}

	.menu__item-label {
		margin: 0 0 0 0.5em;
	}

	.menu--highlight a {
		color: var(--greyLight);
	}

	.menu--highlight .menu__item {
		margin: 0 0 1em;
	}

	.menu--highlight .menu__item-name {
		padding: 0 0.35em;
		line-height: 1.4;
		transition: color 0.5s;
		transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
	}

	.menu--highlight .menu__item-name::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 10%;
		left: 0;
		bottom: 0;
		opacity: 0.8;
		transform: scale3d(0, 1, 1);
		transform-origin: 0% 50%;
		transition: transform 0.5s;
		transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
	}

	.menu--highlight .menu__item-label {
		font-size: 1em;
		transform: translate3d(-0.5em, 0, 0);
		transition:
			transform 0.5s,
			color 0.5s;
		transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
	}

	.menu--highlight .menu__item .menu__item-name::before,
	.menu--highlight .menu__item .menu__item-label::before {
		background: var(--yellow);
	}

	/* Hover */
	.menu--highlight .menu__item:hover,
	.menu--highlight .menu__item:focus {
		color: var(--ink);
	}

	.menu--highlight .menu__item:hover .menu__item-name::before,
	.menu--highlight .menu__item:focus .menu__item-name::before,
	.menu--highlight .menu__item:hover .menu__item-label::before,
	.menu--highlight .menu__item:focus .menu__item-label::before {
		transform: scale3d(1, 1, 1);
	}

	.menu--highlight .menu__item:hover .menu__item-label,
	.menu--highlight .menu__item:focus .menu__item-label {
		transform: translate3d(0, 0, 0);
	}
</style>
