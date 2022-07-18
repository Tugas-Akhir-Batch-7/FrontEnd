<style>
@import "./assets/style.css";

a.nav-profile {
  color: #525252;
  /* font-size: 100px; */
  text-decoration: none;
}
</style>

<template>
  <div id="main">
   
    <nav class="header navbar navbar-expand-lg navbar-light">
      <!-- company logo -->
      <div class="company_space">
        <div id="header_logo">
          <!-- <img src="https://via.placeholder.com/100" alt="" /> -->
          <img class="logo-img" src="./assets/fosanlogo.png" alt="" />
        </div>
        <div id="company_name h4">
          <!-- <p class="h4">BEBAS</p> -->
          <router-link to="/" class="h4 logo-name"> BOOTCAMP </router-link>
        </div>
      </div>
      <button
        class="navbar-toggler me-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedConten"
        aria-controls="navbarSupportedConten"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedConten">
        <div v-if="!isLoggedIn" class="d-flex justify-content-end">
          <RouterLink to="/login">Sign In</RouterLink>
          <RouterLink to="/signup">Sign Up</RouterLink>
        </div>
        <!-- user profile -->
        <div v-else class="justify-content-start ms-4 ps-2 ms-lg-4 ps-lg-0 justify-content-lg-end d-flex user_profile w-100">
          <div id="user_pfp">
            <img class="profile-photo" :src="profilePhoto" alt="" />
            <!-- <img src="https://via.placeholder.com/100" alt="" /> -->
          </div>
          <div id="user_name">
            <div class="ms-1">
              <router-link
                exact-active-class=""
                class="nav-profile"
                to="/profile"
                >{{ currentName }}</router-link
              >
              <!-- <p></p> -->
              <p class="mt-2 mb-2">{{ currentBatch }}</p>
              <div>
                <button
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  @click="handleLogout"
                  class="px-3 py-1 mt-1 mb-1 btn btn-secondary"
                >
                  Logout
                  <!-- <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg> -->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
    profilePhoto() {
      return this.$store.getters["auth/user"].photo;
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


<style scoped>
.logo-name {
  color: #525252;
  text-decoration: none;
  letter-spacing: 0.15em;
  font-weight: bold;
}

.logo-img {
  width: 4em;
}

.profile-photo {
  /* circular */
  width: 4em;
  /* height: 5em; */
  border-radius: 50%;
}
</style>