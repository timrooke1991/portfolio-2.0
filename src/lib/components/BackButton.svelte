<script>
	function goBack() {
		window.history.back();
	}
</script>

<button on:click={goBack}>back</button>

<style>
	button {
		/* Resetting default styles */
		background: none;
		border: none;
		font: inherit;
		cursor: pointer;

		/* Custom styles for appearance */
		padding: 0.5em;
		display: inline-flex;
        align-items: center;
		background-color: transparent;
		opacity: 0.8;
        width: fit-content;
        justify-self: flex-end;

		color: var(--yellow);
		font-family: var(--codeFont);
		text-transform: lowercase;
		transition: opacity 0.3s;
		font-size: 0.75em;

		/* Ensuring accessibility */
		&:hover,
		&:focus {
			color: var(--yellow);
			opacity: 1;
		}

		/* Styles for disabled state */
		&:disabled {
			cursor: not-allowed;
		}
	}
</style>
