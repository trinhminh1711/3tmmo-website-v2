<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@import "./styles/reset";
@import "./styles/customize";
</style>
