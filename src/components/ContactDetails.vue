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
      <form @submit.prevent="saveEdit">
        <div>
          <label>Photo URL:</label>
          <input v-model="editData.photo" type="text" />
        </div>
        <div>
          <label>Salutation:</label>
          <input v-model="editData.salutation" type="text" />
        </div>
        <div>
          <label>First Name:</label>
          <input v-model="editData.firstName" type="text" required />
        </div>
        <div>
          <label>Last Name:</label>
          <input v-model="editData.lastName" type="text" required />
        </div>
        <div v-for="(phone, index) in editData.phoneNumbers" :key="index">
          <label>Phone Number:</label>
          <input v-model="phone.number" type="text" required />
          <select v-model="phone.type" required>
            <option value="work">Work</option>
            <option value="cell">Cell</option>
            <option value="home">Home</option>
          </select>
          <button type="button" @click="removePhone(index)">Remove</button>
        </div>
        <button type="button" @click="addPhone">Add Phone Number</button>
        <button type="submit">Save</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useContactStore } from '../store';

export default {
  name: 'ContactDetails',
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
        phoneNumbers: [...contact.value.phoneNumbers],
      };
      isEditing.value = true;
    };

    const saveEdit = () => {
      contactStore.updateContact(editData.value);
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

    const addPhone = () => {
      editData.value.phoneNumbers.push({
        number: '',
        type: 'work',
        primary: false,
      });
    };

    const removePhone = (index) => {
      editData.value.phoneNumbers.splice(index, 1);
    };

    return {
      contact,
      isEditing,
      editData,
      editContact,
      saveEdit,
      cancelEdit,
      deleteContact,
      addPhone,
      removePhone,
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
form div {
  margin-bottom: 1rem;
}
button {
  margin-right: 0.5rem;
}
</style>