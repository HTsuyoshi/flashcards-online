import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Selection from './pages/Selection.vue'
import Game from './pages/Game.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/flashcards',
			name: 'Home',
			component: Home
		},
		{
			path: '/flashcards/selection',
			name: 'Selection',
			component: Selection
		},
		{
			path: '/flashcards/game',
			name: 'Game',
			component: Game
		},
	]
})

export default router;
