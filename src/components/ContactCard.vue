<template>
  <div class="contact-card">
    <img :src="contact.photo" alt="Contact Photo" />
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p>{{ contact.primaryPhone }}</p>
    <button @click="viewDetails">View Details</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ContactCard',
  props: {
    contact: Object,
  },
  setup(props) {
    const router = useRouter();

    const viewDetails = () => {
      router.push(`/details/${props.contact.id}`);
    };

    return { viewDetails };
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
