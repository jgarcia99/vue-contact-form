import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '../components/ContactList.vue';
import CreateContact from '../components/CreateContact.vue';
import ContactDetails from '../components/ContactDetails.vue';

const routes = [
  { path: '/', component: ContactList },
  { path: '/create', component: CreateContact },
  { path: '/details/:id', component: ContactDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
