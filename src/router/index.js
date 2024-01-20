import {createRouter, createWebHashHistory} from 'vue-router';

import Home from "../pages/Home.vue";
import EightTrigrams from '../pages/Trigrams/index.vue';
import FiveTalks from '../pages/FiveTalks/index.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/eight-trigrams',
		name: 'EightTrigrams',
		component: EightTrigrams
	},
	{
		path: '/five-talks',
		name: 'FiveTalks',
		component: FiveTalks
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;