<script setup lang='ts'>
	import { ref, onMounted } from 'vue';

	const gameRef = ref<HTMLCanvasElement | null>(null);

	onMounted(() => {
		const game = gameRef.value;
		if (!game) throw new Error('Canvas not found');
		const context = game.getContext('2d');
		if (!context) return;

		const ctx = context;

		// States
		const states = [ 'title', 'menu' ];
		let current_state = states[0];

		//let time = 0;

		// Colors
		const color_black = '#4a4a4a';
		const color_white = '#eaeada';

		game.style.background = color_white;
		ctx.fillStyle = color_black;
		ctx.strokeStyle = color_black;

		// Setup mouse
		//let mouse = {
		//	x: undefined,
		//	y: undefined
		//}

		//window.addEventListener('mousemove',
		//	function(event){
		//		mouse.x = event.x;
		//		mouse.y = event.y;
		//		console.log(mouse);
		//	}
		//)

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

		function writeTitle(title: string, x: number, y: number, size: number) {
			const offset = 3;
			ctx.font = `${size}px Arial`;
			ctx.fillText(title, x - (ctx.measureText(title).width / 2), y);
			ctx.strokeText(title, x + offset - (ctx.measureText(title).width / 2), y - offset);
		}

		function writeText(text: string, x: number, y: number, size: number) {
			ctx.font = `${size}px Arial`;
			ctx.fillText(text, x - (ctx.measureText(text).width / 2), y);
		}

		function drawBox(text: string, x: number, y: number, w: number, h: number, size: number) {
			writeText(text, x, y, size);
			ctx.font = `${size}px Arial`;
			ctx.lineWidth = 2;
			ctx.strokeRect(x - w/2, y - 6*h/8, w, h);
		}

		// Shapes functions

		// Top level functions
		//function drawTitleScreen(t: number) {
		function drawTitleScreen() {
			let y = window.innerHeight / 2;
			let x = window.innerWidth / 2;
			//if (t > 10) {
			//	y = y - (t - 10) * 10;
			//}
			//if (y < -window.innerHeight / 10) {
			//	current_state = 'menu';
			//}
			writeTitle('Flash Cards', x, y, window.innerWidth / 10);
		}

		// Main function
		function draw() {
			setup();
			ctx.shadowBlur = 20;
			ctx.shadowColor = color_black;
			drawArrow();
			border();
			if (current_state[0] == 't') {
				//time++;
				drawTitleScreen();
				//drawTitleScreen(time);
				return;
			}
			if (current_state[0] == 'm') {
				drawBox('start', window.innerWidth / 2, window.innerHeight / 2, 200, 100, window.innerWidth / 10);
				return;
			}
		}

		setInterval(draw, 20);
	});
</script>

<template>
	<canvas ref='gameRef'></canvas>
</template>

<style scoped>
</style>
