<template>
  <div class="contact-details" v-if="contact">
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <img :src="contact.photo" alt="Contact Photo" />
    <ul>
      <li
        v-for="phone in contact.phoneNumbers"
        :key="phone.number"
        :class="phone.type"
      >
        {{ phone.number }} ({{ phone.type }})
      </li>
    </ul>
    <button @click="editContact">Edit</button>
    <button @click="deleteContact">Delete</button>
    <div v-if="isEditing">
      <ContactForm
        :contact="editData"
        @submit="saveEdit"
        @cancel="cancelEdit"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useContactStore } from '../store';
import ContactForm from './ContactForm.vue';

export default {
  name: 'ContactDetails',
  components: {
    ContactForm,
  },
  setup() {
    const contactStore = useContactStore();
    const router = useRouter();
    const route = useRoute();

    const isEditing = ref(false);
    const editData = ref(null);

    const contact = computed(() =>
      contactStore.contacts.find(
        (contact) => contact.id === Number(route.params.id)
      )
    );

    const editContact = () => {
      editData.value = {
        ...contact.value,
        phoneNumbers: contact.value.phoneNumbers
          ? [...contact.value.phoneNumbers]
          : [],
      };

      if (editData.value.phoneNumbers.length > 0) {
        const primaryIndex = editData.value.phoneNumbers.findIndex(
          (phone) => phone.primary
        );
        editData.value.primaryPhoneIndex =
          primaryIndex !== -1 ? primaryIndex : 0;
      }

      isEditing.value = true;
    };

    const saveEdit = (updatedContact) => {
      contactStore.updateContact(updatedContact);
      isEditing.value = false;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editData.value = null;
    };

    const deleteContact = () => {
      contactStore.deleteContact(contact.value.id);
      router.push('/');
    };

    return {
      contact,
      isEditing,
      editData,
      editContact,
      saveEdit,
      cancelEdit,
      deleteContact,
    };
  },
};
</script>

<style scoped>
.contact-details {
  padding-top: 80px;
}
ul {
  list-style-type: none;
  padding: 0;
}
.work {
  color: blue;
}
.cell {
  color: green;
}
.home {
  color: red;
}
button {
  margin-right: 0.5rem;
}
</style>
