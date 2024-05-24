<template>
  <div class="home">
    <AppHeader />
    <ContactList />
    <CreateContact />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue';
import ContactList from '@/components/ContactList.vue';
import CreateContact from '@/components/CreateContact.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    ContactList,
    CreateContact,
  },
};
</script>
