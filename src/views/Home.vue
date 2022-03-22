<template>
  <v-app>
    <v-main>
      <v-container fluid class="grey lighten-5 pd-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="2">
            <SideBar class="left-sidebar" />
          </v-col>
          <v-col cols="6" md="10">
            <div>
              <Menu />
            </div>
            <div class="page-wrapper pa-5">
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import Menu from "../components/Menu.vue";
export default {
  name: "App",
  components: {
    SideBar,
    Menu,
  },
  data() {
    return {
      loginTrue: false,
    };
  },
  mounted() {
    this.loginTrue = true;
  },
};
</script>
<style lang="scss">
@import "../styles/customize";
@import "../styles/reset";
* {
  font-family: Arial, Helvetica, sans-serif;
}
.left-sidebar {
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/sidebar-bg.jpg");
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.4s;
}

.fade-enter-active {
  transition-delay: 0.4s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.main {
  padding: 1.6rem;
}
.page-wrapper {
  background-color: #e7e7e7;
}
</style>
