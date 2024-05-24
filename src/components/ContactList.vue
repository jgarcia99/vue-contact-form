<template>
  <div class="contact-list">
    <button @click="createContact">Create New Contact</button>
    <div v-if="contacts.length === 0" class="empty-state">
      No contacts available.
    </div>
    <div v-else>
      <ContactCard
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useContactStore } from '../store';
import ContactCard from './ContactCard.vue';

export default {
  name: 'ContactList',
  components: {
    ContactCard,
  },
  setup() {
    const contactStore = useContactStore();
    const router = useRouter();

    const contacts = computed(() => contactStore.contacts);

    const createContact = () => {
      router.push('/create');
    };

    return { contacts, createContact };
  },
};
</script>

<style scoped>
.contact-list {
  padding-top: 80px;
  text-align: center;
}
button {
  margin: 1rem;
  padding: 0.5rem 1rem;
}
.empty-state {
  font-size: 1.5rem;
  margin-top: 2rem;
}
</style>
