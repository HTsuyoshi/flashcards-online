<script setup lang='ts'>
	enum Question {
		Joyo = 'joyo',
		Jouyou = 'jouyou',
		Jinmeiyo = 'jinmeiyo',
		Jinmeiyou = 'jinmeiyou',
		Grade_1 = 'grade-1',
		Grade_2 = 'grade-2',
		Grade_3 = 'grade-3',
		Grade_4 = 'grade-4',
		Grade_5 = 'grade-5',
		Grade_6 = 'grade-6',
		Grade_8 = 'grade-8',
		All = 'all'
	};

	const game = '/flashcards/game?category=';
</script>

<template>
	<div id='canva'>
		<div id='title' class='white'>
			Choose level
		</div>
		<div id='levels'>
			<router-link :to='game + Question.Joyo'>
				<button type='button'>Joyo</button>
			</router-link>
			<router-link :to='game + Question.Jouyou'>
				<button type='button'>Jouyou</button>
			</router-link>
			<router-link :to='game + Question.Jinmeiyo'>
				<button type='button'>Jinmeiyo</button>
			</router-link>
			<router-link :to='game + Question.Jinmeiyou'>
				<button type='button'>Jinmeiyou</button>
			</router-link>
			<router-link :to='game + Question.Grade_1'>
				<button type='button'>Grade_1</button>
			</router-link>
			<router-link :to='game + Question.Grade_2'>
				<button type='button'>Grade_2</button>
			</router-link>
			<router-link :to='game + Question.Grade_3'>
				<button type='button'>Grade_3</button>
			</router-link>
			<router-link :to='game + Question.Grade_4'>
				<button type='button'>Grade_4</button>
			</router-link>
			<router-link :to='game + Question.Grade_5'>
				<button type='button'>Grade_5</button>
			</router-link>
			<router-link :to='game + Question.Grade_6'>
				<button type='button'>Grade_6</button>
			</router-link>
			<router-link :to='game + Question.Grade_8'>
				<button type='button'>Grade_8</button>
			</router-link>
			<router-link :to='game + Question.All'>
				<button type='button'>All</button>
			</router-link>
		</div>
	</div>
</template>

<style scoped>
#canva {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: space-evenly;
}
#levels {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex: 9;
}
#title {
	margin: 2em;
	flex: 1;
}
button {
	margin: 0.5em;
}
</style>
