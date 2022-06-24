<style>
@import "./assets/style.css";
</style>

<template>
  <div id="main">
    <!-- <header v-if="!isLoggedIn">
      <div class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Sign In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
        <RouterLink to="/signup_2">Sign Up _ KTP</RouterLink>
      <RouterLink to="/signup_3">Sign Up _ PFP</RouterLink>
      <RouterLink to="/signup_4">Sign Up _ Verify</RouterLink>
      <RouterLink to="/forgot_password">Lupa Pass</RouterLink>
      </div>

      <div class="navbar">
        <RouterLink to="/murid_dashboard">Murid</RouterLink>
      </div>
    </header> -->
    <div class="header">
      <!-- company logo -->
      <div class="company_space">
        <div id="header_logo">
          <img src="https://via.placeholder.com/100" alt="" />
        </div>

        <div id="company_name">
          <p>Bebas</p>
        </div>
      </div>
      <div v-if="!isLoggedIn" style="display: flex">
        <RouterLink to="/login">Sign In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </div>
      <!-- user profile -->
      <div v-else class="user_profile">
        <div id="user_pfp"></div>
        <div id="user_name">
          <p>{{ currentName }}</p>
          <p>{{ currentBatch }}</p>
          <button @click="handleLogout" class="btn btn-secondary">Logout</button>
        </div>
      </div>
    </div>
    <!-- <RouterLink to="/murid_dashboard">Murid</RouterLink>
    <RouterLink to="/guru_dashboard1">Guru</RouterLink> -->

    <RouterView />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isLoggedIn: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/user"] ? true : false;
    },
    currentName() {
      return this.$store.getters["auth/user"].name;
    },
    currentBatch() {
      return this.$store.getters["auth/user"].nama_batch;
    },
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
    async handleLogout() {
      try {
        await this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>