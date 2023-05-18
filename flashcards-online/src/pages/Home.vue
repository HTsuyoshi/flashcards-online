<script setup lang='ts'>
	const selection = '/flashcards/selection';
</script>

<template>
	<span id='border'>
	</span>
	<div id='canva'>
		<a class='white' href='https://github.com/HTsuyoshi' target='_blank'>
			<font-awesome-icon :icon="['fas', 'user-secret']" />
			Github
		</a>
		<div id='title' class='white'>
			Flashcards
		</div>
		<router-link :to='selection'>
			<button type='button'>
				Play
			</button>
		</router-link>
	</div>
</template>

<style scoped>
</style>

<style>
#canva {
	width: 80vw;
	min-height: 90vh;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	border: 0.1em solid var(--white);
	flex-direction: column;
}
#title {
	font-size: 200%;
	font-family: 'IBM Plex Mono';
}
.white {
	color: var(--white);
}
a {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
button {
	background-color: var(--black);
	border: 0.1em solid var(--white);
	color: var(--white);
	width: 10em;
	height: 4em;
}
</style>
