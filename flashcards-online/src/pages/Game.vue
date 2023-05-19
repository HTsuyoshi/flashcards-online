<script setup lang='ts'>
	import { useRoute } from 'vue-router';
	import { Ref, ref, onMounted } from 'vue';

	// Fetch
	async function get_data(category: string) {
		kanji_data = await fetch(`https://kanjiapi.dev/v1/kanji/${category}`)
			.then(response => response.json())
			.catch(error => console.error(error));
	}

	async function get_answer(one_kanji: string) {
		answer = await fetch(`https://kanjiapi.dev/v1/kanji/${one_kanji}`)
			.then(response => response.json())
			.catch(error => console.error(error));
	}

	// Constants setup
	async function setup() {
		const c = useRoute().query.category as string;
		if (c === null) return;
		await get_data(c);
		setup_kanji();
	}

	function setup_kanji() {
		for (let j=0; j<10 && ((i + j) < kanji_data.length); j++) {
			if (kanjiRefs.value)
				kanjiRefs.value[j].innerText = kanji_data[i+j];
		}
		if (page_counter.value)
			page_counter.value.innerText = `${Math.ceil(i / 10) + 1}/${Math.ceil(kanji_data.length / 10)+1}`;
	}

	function next_page() {
		if (i + 10 <= kanji_data.length) {
			i += 10;
			setup_kanji();
		}
	}

	function prev_page() {
		if (i - 10 >= 0) {
			i -= 10;
			setup_kanji();
		}
	}

	// HTML setup
	function setup_game() {
		for (let j=0; j<10 && ((i + j) < kanji_data.length); j++) {
			current_kanji.push(kanji_data[i+j]);
		}

		if (title.value) title.value.innerText = 'Guess';
		next_kanji();
		setup_question();
	}

	function finish_game() {
		selection_style.value = { display: 'block' };
		game_style.value      = { display: 'none' };
		question_style.value  = { display: 'none' };
		score_style.value     = { display: 'none' };

		if (title.value) title.value.innerText = 'Choose Kanji';
		for (let i=0; i<10; i++) {
			current_kanji_life[i] = 1;
		}
		kanji_counter_right = 0;
		kanji_counter_wrong = 0;
	}

	async function view_answer() {
		game_style.value   = { display: 'block' };
		answer_style.value = { display: 'none' };
		await get_answer(current_kanji[current_kanji_index]);
		if (kanji_meaning_ref.value) kanji_meaning_ref.value.innerText = 'Meanings: ' + answer.meanings.join(', ');
		if (kanji_kun_ref.value) kanji_kun_ref.value.innerText         = 'Kun readings: ' + answer.kun_readings.join(', ');
		if (kanji_on_ref.value) kanji_on_ref.value.innerText           = 'On reading:' + answer.on_readings.join(', ');
		if (title.value) title.value.innerText = 'Answer';
	}

	// Transition
	function setup_question() {
		selection_style.value = { display: 'none' };
		game_style.value      = { display: 'none' };
		question_style.value  = { display: 'block' };
		score_style.value     = { display: 'block' };
		answer_style.value    = { display: 'block' };

		if (question.value) question.value.innerText = current_kanji[current_kanji_index];
		if (kanji_counter.value) kanji_counter.value.innerText = `${10 - current_kanji.length}/${10}`;

		if (current_kanji_life[current_kanji_index] != 1) {
			if (question_repeat.value)
				question_repeat.value.innerText = '(Repeated)';
		}
	}

	function next_kanji() {
		current_kanji_index = Math.floor(Math.random() * (current_kanji.length - Number.EPSILON));
	}

	function scored_right() {
		kanji_counter_right++;
		if (kanji_counter_right_ref.value) kanji_counter_right_ref.value.innerText = `Right: ${kanji_counter_right}`;
		current_kanji.splice(current_kanji_index, 1);
		current_kanji_life.splice(current_kanji_index, 1);

		if (current_kanji.length === 0) {
			finish_game();
			return;
		}

		if (title.value) title.value.innerText = 'Guess';
		next_kanji();
		setup_question();
	}

	function scored_wrong() {
		if (current_kanji_life[current_kanji_index] == 1) {
			current_kanji_life[current_kanji_index]--;
			kanji_counter_new++;
			if (kanji_counter_new_ref.value) kanji_counter_new_ref.value.innerText = `New kanji: ${kanji_counter_new}`;
			next_kanji();
			setup_question();
			return;
		}

		if (current_kanji_life[current_kanji_index] == 0) {
			current_kanji_life[current_kanji_index]--;
			kanji_counter_wrong++;
			if (kanji_counter_wrong_ref.value) kanji_counter_wrong_ref.value.innerText = `Wrong: ${kanji_counter_wrong}`;
		}

		if (title.value) title.value.innerText = 'Guess';
		next_kanji();
		setup_question();
	}

	// Constants
	let kanji_data: string[];
	let answer: any;

	// Refs
	const kanjiRefs: Ref<HTMLElement[]> = ref([]);
	const page_counter: Ref<HTMLElement | null> = ref(null);
	const kanji_counter: Ref<HTMLElement | null> = ref(null);
	const question: Ref<HTMLElement | null> = ref(null);
	const question_repeat: Ref<HTMLElement | null> = ref(null);
	const title: Ref<HTMLElement | null> = ref(null);

	// Game
	let i: number = 0;
	let kanji_counter_right: number = 0;
	let kanji_counter_wrong: number = 0;
	let kanji_counter_new: number = 0;
	const kanji_counter_right_ref: Ref<HTMLElement | null> = ref(null);
	const kanji_counter_wrong_ref: Ref<HTMLElement | null> = ref(null);
	const kanji_counter_new_ref: Ref<HTMLElement | null> = ref(null);
	const current_kanji: string[] = [];
	const current_kanji_life: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	const kanji_meaning_ref: Ref<HTMLElement | null> = ref(null);
	const kanji_kun_ref: Ref<HTMLElement | null> = ref(null);
	const kanji_on_ref: Ref<HTMLElement | null> = ref(null);
	let current_kanji_index: number = 0;

	let selection_style = ref({ display: 'flex' });
	let game_style      = ref({ display: 'none' });
	let answer_style    = ref({ display: 'none' });
	let question_style  = ref({ display: 'none' });
	let score_style     = ref({ display: 'none' });

	onMounted(() => {
		setup();
	});
</script>

<template>
	<div id='canva' class='white'>
		<div ref='title'>
			Choose Kanji
		</div>
		<div>
			<div :style='selection_style'>
				<ul>
					<li v-for='index in 10' :key='index' :ref='(el) => {
							if (kanjiRefs) kanjiRefs.push(el as HTMLElement);
						}'>
					</li>
				</ul>
			</div>
			<div :style='question_style' ref='question' id='question'>
				?
			</div>
			<div :style='question_style' ref='question_repeat'>
			</div>
			<div :style='game_style' id='answer'>
				<div ref='kanji_meaning_ref'>
				</div>
				<div ref='kanji_kun_ref'>
				</div>
				<div ref='kanji_on_ref'>
				</div>
			</div>
		</div>
		<div>
			<div :style='selection_style' ref='page_counter'>
				1/?
			</div>
			<div :style='score_style'>
				<div ref='kanji_counter'>
					0/10
				</div>
				<div id='counter'>
					<div ref='kanji_counter_right_ref'>
						Right: 0
					</div>
					<div ref='kanji_counter_wrong_ref'>
						Wrong: 0
					</div>
				</div>
				<div ref='kanji_counter_new_ref'>
					New Kanji: 0
				</div>
			</div>
		</div>
		<div>
			<div :style='selection_style' id='selection-buttons'>
				<div>
					<button @click='prev_page()' class='white'>Prev</button>
					<button @click='next_page()' class='white'>Next</button>
				</div>
				<button @click='setup_game()' class='white'>Start</button>
				<router-link to='selection' id='return'>
					<button class='white'>Return</button>
				</router-link>
			</div>
			<div>
				<div :style='game_style'>
					<button @click='scored_wrong()' class='white'>
						<font-awesome-icon :icon="['fas', 'xmark']" />
					</button>
					<button @click='scored_right()' class='white'>
						<font-awesome-icon :icon="['fas', 'check']" />
					</button>
				</div>
				<div :style='answer_style'>
					<button @click='view_answer()'>
						Continue
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#selection-buttons {
	display: flex;
	flex-direction: column;
	align-items: center;
}
#question {
	font-size: 8em;
}
#answer {
	margin-top: 3em;
	display: flex;
	flex-direction: column;
	text-align: left;
}
#answer div {
	margin: 1em;
}
#counter {
	display: flex;
}
#counter div {
	margin: 1em;
}
button {
	display: inline-block;
	margin: 1em;
}
ul {
	list-style-type: none;
	display: flex;
	font-size: 1.6em;
	margin: 0;
	margin-left: 0.5em;
	margin-right: 0.5em;
	padding: 0;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
li {
	margin: 1em;
}
</style>
