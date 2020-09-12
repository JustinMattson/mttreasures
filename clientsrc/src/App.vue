<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    }
    // this.$store.dispatch("initializeSocket");
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
// @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Merriweather&display=swap");
* {
  // font-family: "Fredoka One", cursive;
  font-family: "Merriweather", serif;
}
.light-text-shadow {
  text-shadow: 2px 2px 5px black;
}
.dark-text-shadow {
  text-shadow: 2px 2px 5px white;
}
</style>
