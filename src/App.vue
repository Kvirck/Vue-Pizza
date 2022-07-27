<template>
  <div class="wrapper">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: { Header},
};
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
