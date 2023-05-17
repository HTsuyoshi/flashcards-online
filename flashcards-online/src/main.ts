import { createApp } from 'vue'
import './style.css'
import Flashcard from './pages/Flashcard.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faCheck, faXmark)

const flashcard = createApp(Flashcard).component('font-awesome-icon', FontAwesomeIcon);

flashcard.use(router).mount('#flashcard');

flashcard.config.errorHandler = (err, instance, info) => {
	console.log(err);
	console.log(instance);
	console.log(info);
};
