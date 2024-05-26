<template>
  <form @submit.prevent="onSubmit">
    <TextInput id="photo" label="Photo URL:" v-model="form.photo" />
    <TextInput id="salutation" label="Salutation:" v-model="form.salutation" />
    <TextInput
      id="firstName"
      label="First Name:"
      v-model="form.firstName"
      required
    />
    <TextInput
      id="lastName"
      label="Last Name:"
      v-model="form.lastName"
      required
    />

    <div
      v-for="(phone, index) in form.phoneNumbers"
      :key="index"
      class="phone-input"
    >
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
      <label>
        <input type="radio" v-model="primaryPhoneIndex" :value="index" />
        Primary
      </label>
      <button
        type="button"
        @click="removePhone(index)"
        :disabled="form.phoneNumbers.length === 1"
      >
        Remove
      </button>
    </div>

    <button type="button" @click="addPhone">Add Phone Number</button>
    <button type="submit">Save</button>
    <button type="button" @click="$emit('cancel')">Cancel</button>
  </form>
</template>

<script>
import { ref, watch } from 'vue';
import TextInput from './TextInput.vue';

export default {
  name: 'ContactForm',
  components: {
    TextInput,
  },
  props: {
    contact: {
      type: Object,
      default: () => ({
        photo: '',
        salutation: '',
        firstName: '',
        lastName: '',
        phoneNumbers: [{ number: '', type: 'work', primary: false }],
      }),
    },
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const form = ref({ ...props.contact });
    const primaryPhoneIndex = ref(
      form.value.phoneNumbers.findIndex((phone) => phone.primary) || 0
    );

    const addPhone = () => {
      form.value.phoneNumbers.push({
        number: '',
        type: 'work',
        primary: false,
      });
    };

    const removePhone = (index) => {
      if (form.value.phoneNumbers.length > 1) {
        form.value.phoneNumbers.splice(index, 1);
        if (primaryPhoneIndex.value >= index) {
          primaryPhoneIndex.value = Math.max(0, primaryPhoneIndex.value - 1);
        }
      }
    };

    const onSubmit = () => {
      let primaryPhone = '';
      if (
        Array.isArray(form.value.phoneNumbers) &&
        primaryPhoneIndex.value >= 0 &&
        primaryPhoneIndex.value < form.value.phoneNumbers.length
      ) {
        primaryPhone = form.value.phoneNumbers[primaryPhoneIndex.value].number;
      }

      const newContact = {
        ...form.value,
        primaryPhone,
      };
      emit('submit', newContact);
    };

    watch(
      () => props.contact,
      (newContact) => {
        form.value = { ...newContact };
        primaryPhoneIndex.value =
          form.value.phoneNumbers.findIndex((phone) => phone.primary) || 0;
      },
      { deep: true }
    );

    return {
      form,
      primaryPhoneIndex,
      addPhone,
      removePhone,
      onSubmit,
    };
  },
};
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>
