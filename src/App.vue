<template>
  <v-app class="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
<style>
.app{
  
  background: url('assets/wallpapper.png');
  background-size: cover;
  height: 100vh;
}
</style>