import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '../components/ContactList.vue';
import CreateContact from '../components/CreateContact.vue';

const routes = [
  { path: '/', component: ContactList },
  { path: '/create', component: CreateContact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
