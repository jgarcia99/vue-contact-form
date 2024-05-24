<template>
  <div id="app">
    <app-header></app-header>
    <section class="content">
      <nav>
        <router-link to="/">Contact List</router-link> |
        <router-link to="/create">Create Contact</router-link>
      </nav>
      <router-view />
    </section>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.content {
  padding-top: 4rem;
}
</style>
