
<section class="content">
	<div class="divider">/* ---  Welcome 👋  --- */</div>
	<h1><span class="highlight">Hey, I'm Tim</span>!<br> I'm a software engineer, marathon runner and aspiring chef.</h1>
	<p class="subheading">I am based in Bournemouth, and work for Legl as a Software Engineer</p>
	
	<p>
		My experience is in product engineering at small or scaleup companies. I've held roles in
		Product Management and Software Engineering. I am curious and love to learn new things.
		Currently, I am learning <span>Svelte</span>.
	</p>

	<nav class="menu menu--highlight">
		<a class="menu__item" href="/post">
			<span class="menu__item-name">Learning</span>
			<span class="menu__item-label">Read more about my approach to learning</span>
		</a>
		<a class="menu__item" href="/blog">
			<span class="menu__item-name">Blog</span>
			<span class="menu__item-label">Mad ramblings</span>
		</a>
		<a class="menu__item" href="/projects">
			<span class="menu__item-name">Projects</span>
			<span class="menu__item-label">Stuff that I have built</span>
		</a>
		<a class="menu__item" href="/contact">
			<span class="menu__item-name">Contact</span>
			<span class="menu__item-label">Where to find me</span>
		</a>
	</nav>
</section>

<style lang="scss">
	@for $i from 1 through 4 {
		.content *:nth-child(#{$i}) {
			animation-delay: 0.2 + ($i * 0.18s);
		}
		.content nav a:nth-child(#{$i}) {
			animation-delay: 0.75 + ($i * 0.12s);
		}
	}

	.content > *,
	.content nav a {
		opacity: 0;
		transform: translateY(16px);
		animation: fade_in_intro 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
	}

	@keyframes fade_in_intro {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	h1 {
		font-size: clamp(1.8rem, 1rem + 3vw, 3.5rem);
    	margin-bottom: var(--halfNote);
    	font-weight: 400;	
    	max-width: 17em;
		color: var(--ink);
	}

	.highlight {
		color: var(--yellow);
	}

	.subheading {
		font-size: clamp(1.2rem, .6rem + 2vw, 1.8rem);
		margin-top: var(--quarterNote);
		font-family: var(--headingFont);
		margin-bottom: var(--quarterNote);
		color: var(--ink);
		line-height: 1.4;
		max-width: 23em;	
	}

	.divider {
		color: #4d4d4c;
		line-height: 1.4;
    	font-family: "Space Mono", monospace;
		max-width: 38em;
	
	}

	p {
		margin: 0 var(--halfNote) var(--quarterNote) 0;
		max-width: 38em;
		color: var(--ink);

	}

	.menu {
		position: relative;
		max-width: 38em;
	
	}

	.menu__item {
		position: relative;
		display: block;
		outline: none;
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
	color: #4d4d4c;
}

.menu--highlight .menu__item {
	margin: 0 0 1em;
}

.menu--highlight .menu__item-name {
	padding: 0 0.35em;
	line-height: 1.4;
	transition: color 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--highlight .menu__item-name::before {
	content: '';
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 30%;
	left: 0;
	bottom: 0;
	opacity: 0.3;
	transform: scale3d(0,1,1);
	transform-origin: 0% 50%;
	transition: transform 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--highlight .menu__item-label {
	font-size: 1em;
	letter-spacing: 0.05em;
	transform: translate3d(-0.5em,0,0);
	transition: transform 0.5s, color 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--highlight .menu__item-label::before {
	content: '';
	position: absolute;
	z-index: -1;
	width: 25%;
	height: 1px;
	left: 0.05em;
	top: 1.25em;
	opacity: 0.3;
	transform: scale3d(0,1,1);
	transform-origin: 100% 50%;
	transition: transform 0.5s;
	transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--highlight .menu__item .menu__item-name::before,
.menu--highlight .menu__item .menu__item-label::before {
	background: var(--purple);
}


/* Hover */

.menu--highlight .menu__item:hover,
.menu--highlight .menu__item:focus {
	color: var(--purple);
}


.menu--highlight .menu__item:hover .menu__item-name::before,
.menu--highlight .menu__item:focus .menu__item-name::before,
.menu--highlight .menu__item:hover .menu__item-label::before,
.menu--highlight .menu__item:focus .menu__item-label::before {
	transform: scale3d(1,1,1);
}

.menu--highlight .menu__item:hover .menu__item-label,
.menu--highlight .menu__item:focus .menu__item-label {
	transform: translate3d(0,0,0);
}

.menu--highlight .menu__item:hover .menu__item-label::before,
.menu--highlight .menu__item:focus .menu__item-label::before {
	transition-timing-function: ease;
	transform-origin: 0% 50%;
}

</style>
