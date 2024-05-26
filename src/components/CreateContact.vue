<template>
  <div class="create-contact">
    <ContactForm @submit="saveContact" @cancel="cancel" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useContactStore } from '../store';
import ContactForm from './ContactForm.vue';

export default {
  name: 'CreateContact',
  components: {
    ContactForm,
  },
  setup() {
    const contactStore = useContactStore();
    const router = useRouter();

    const saveContact = (newContact) => {
      newContact.id = Date.now();
      newContact.photo =
        newContact.photo ||
        `https://picsum.photos/200/300?random=${Math.random()}`;
      contactStore.addContact(newContact);
      router.push('/');
    };

    const cancel = () => {
      router.push('/');
    };

    return {
      saveContact,
      cancel,
    };
  },
};
</script>

<style scoped>
.create-contact {
  padding-top: 80px;
}
</style>
