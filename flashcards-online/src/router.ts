import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Selection from './pages/Selection.vue'
import Game from './pages/Game.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/selection',
			name: 'Selection',
			component: Selection
		},
		{
			path: '/game',
			name: 'Game',
			component: Game
		},
	]
})

export default router;
