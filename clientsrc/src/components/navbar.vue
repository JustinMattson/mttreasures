<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-lg">
    <!-- <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img alt="Vue logo" src="../assets/logo.png" class="sml-img" />olen-Told
    </router-link>-->
    <router-link 
      data-toggle="collapse" data-target=".navbar-collapse.show"
      class="navbar-brand bg-light rounded px-2" :to="{ name: 'Home' }">
      <img
        class="rotateImg180"
        alt="Vue logo"
        src="../assets/logo.png"
        style="height:30px;object-position: -11px; margin-left:-15px"
      />
      <img
        class="rotateImg180"
        alt="Vue logo"
        src="../assets/logo.png"
        style="height:30px;object-position: 11px;"
      />
      <span style="margin-left:-15px;">ontana Treasure - Home</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item align-self-center" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            <h4 class="text-secondary">Home</h4>
          </router-link>
        </li>-->
        <li class="nav-item align-self-center" :class="{ active: $route.name == 'Jobs' }">
          <router-link 
            data-toggle="collapse" data-target=".navbar-collapse.show"
            :to="{ name: 'Jobs' }" class="nav-link">
            <h5 class="text-secondary">Details</h5>
          </router-link>
        </li>
        <li
          class="nav-item align-self-center"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link 
            data-toggle="collapse" data-target=".navbar-collapse.show"
            class="nav-link" :to="{ name: 'Profile' }">
            <h6 class="text-secondary">Profile</h6>
          </router-link>
        </li>
      </ul>
      <span v-show="$auth.isAuthenticated" class="mx-4">
        <router-link 
          data-toggle="collapse" data-target=".navbar-collapse.show"
          class="nav-link" :to="{ name: 'Profile' }">
          <h6 class="text-secondary">
            {{profile.name}}
            <img
              class="rounded-circle"
              :src="profile.picture"
              style="height:25px;width:25px"
            />
          </h6>
        </router-link>
      </span>
      <span class="navbar-text">
        <small
          class="text-muted"
          v-show="!$auth.isAuthenticated"
        >Create account and log in for additional features ></small>
        <button 
        data-toggle="collapse" data-target=".navbar-collapse.show"
        class="btn btn-success ml-2" @click="login" v-if="!$auth.isAuthenticated">
          Login
        </button>
        <button 
        data-toggle="collapse" data-target=".navbar-collapse.show"
        class="btn btn-danger" @click="logout" v-else>
          Logout
        </button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      // console.log("this.$auth.user: ");
      // console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
};
</script>

<style scoped>
.sml-img {
  height: 3rem;
}
.rotateImg180 {
  transform: rotate(180deg);
}
</style>
