<template>
  <form @submit.prevent="saveContact">
    <TextInput id="photo" label="Photo URL:" v-model="photo" />
    <TextInput id="salutation" label="Salutation:" v-model="salutation" />
    <TextInput
      id="firstName"
      label="First Name:"
      v-model="firstName"
      required
    />
    <TextInput id="lastName" label="Last Name:" v-model="lastName" required />
    <div v-for="(phone, index) in phoneNumbers" :key="index">
      <TextInput
        :id="'phone' + index"
        label="Phone Number:"
        v-model="phone.number"
        type="tel"
        required
      />
      <select v-model="phone.type" required>
        <option value="work">Work</option>
        <option value="cell">Cell</option>
        <option value="home">Home</option>
      </select>
      <button type="button" @click="removePhone(index)">Remove</button>
    </div>
    <button type="button" @click="addPhone">Add Phone Number</button>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useContactStore } from '../store';
import TextInput from './TextInput.vue';

export default {
  name: 'CreateContact',
  components: {
    TextInput,
  },
  setup() {
    const contactStore = useContactStore();
    const router = useRouter();

    const photo = ref('');
    const salutation = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const phoneNumbers = ref([{ number: '', type: 'work', primary: false }]);

    const addPhone = () => {
      phoneNumbers.value.push({ number: '', type: 'work', primary: false });
    };

    const removePhone = (index) => {
      phoneNumbers.value.splice(index, 1);
    };

    const saveContact = () => {
      const newContact = {
        id: Date.now(),
        photo:
          photo.value ||
          `https://picsum.photos/200/300?random=${Math.random()}`,
        salutation: salutation.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumbers: phoneNumbers.value,
        primaryPhone:
          phoneNumbers.value.find((phone) => phone.primary) ||
          phoneNumbers.value[0].number,
      };
      contactStore.addContact(newContact);
      router.push('/');
    };

    const cancel = () => {
      router.push('/');
    };

    return {
      photo,
      salutation,
      firstName,
      lastName,
      phoneNumbers,
      addPhone,
      removePhone,
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
form div {
  margin-bottom: 1rem;
}
button {
  margin-right: 0.5rem;
}
</style>
