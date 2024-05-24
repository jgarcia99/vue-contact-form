<template>
  <div class="contact-card">
    <img :src="contact.photo" alt="Contact Photo" />
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p>{{ contact.primaryPhone }}</p>
    <button>View Details</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContactCard',
  props: {
    contact: Object,
  },
});
</script>

<style scoped>
.contact-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  display: inline-block;
  text-align: center;
}
.contact-card img {
  max-width: 100px;
  height: auto;
}
</style>
