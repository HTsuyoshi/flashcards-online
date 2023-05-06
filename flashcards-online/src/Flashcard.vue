<script setup lang='ts'>
	import { ref, onMounted } from 'vue';

	const gameRef = ref<HTMLCanvasElement | null>(null);

	onMounted(() => {
		const game = gameRef.value;
		if (!game)
			throw new Error('Canvas not found');

		const context = game.getContext('2d');
		if (!context) return;

		const ctx = context;

		// Colors
		const color_black = '#4a4a4a';
		const color_white = '#eaeada';

		game.style.background = color_white;
		ctx.fillStyle = color_black;
		ctx.strokeStyle = color_black;

		// States
		const states = [ 'title' ];
		let current_state = states[0];

		// Basic functions
		function setup() {
			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
		}

		function border() {
			const border = 10;
			const gap = 5;

			ctx.lineWidth = 2;
			ctx.strokeRect(border, border, window.innerWidth - (2*border), window.innerHeight - (2*border));

			ctx.lineWidth = 5;
			ctx.strokeRect(gap + border, gap + border, window.innerWidth - (2*gap + 2*border), window.innerHeight - (2*gap + 2* border));

			ctx.lineWidth = 2;
			ctx.strokeRect(2*gap + border, 2*gap + border, window.innerWidth - (2*2*gap + 2*border), window.innerHeight - (2*2*gap + 2*border));
		}

		function drawArrow() {
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.moveTo(75, 50);
			ctx.lineTo(100, 75);
			ctx.lineTo(100, 25);
			ctx.closePath();
			ctx.stroke();
		}

		function writeTitle(title: string) {
			const offset = 3;
			ctx.font = '100px Arial';
			ctx.fillText(title, window.innerWidth / 2 - (ctx.measureText(title).width / 2), window.innerHeight / 2);
			ctx.strokeText(title, window.innerWidth / 2 - (ctx.measureText(title).width / 2) + offset, window.innerHeight / 2 - offset);
		}

		//function writeText(text: string) {
		//	ctx.font = '40px Arial';
		//	ctx.fillText(text, window.innerWidth / 2, window.innerHeight / 2);
		//}

		// Top level functions
		function drawTitle() {
			writeTitle('Flash Cards');
		}

		// Main function
		function draw() {
			setup();
			ctx.shadowBlur = 20;
			ctx.shadowColor = color_black;
			drawArrow();
			border();
			if (current_state == 'title') {
				drawTitle();
				return;
			}
		}

		setInterval(draw, 500);
	});
</script>

<template>
	<canvas ref='gameRef'></canvas>
</template>

<style scoped>
</style>
