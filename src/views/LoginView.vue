<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form style="justify-content: center" @submit.prevent="login">
        <div>
          <input
            class="fields"
            type="email"
            name="email"
            id="text"
            placeholder="Your E-mail"
            v-model="email"
          />
        </div>

        <div>
          <input
            class="fields"
            type="password"
            name="password"
            id="text"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </form>

      <button class="buttons" id="text" @click="handleLogin">Sign In</button>

      <div id="text" style="white-space: nowrap">
        <p>
          Forgot your Password? Click
          <RouterLink to="/forgot_password">here</RouterLink>
        </p>
      </div>

      <div id="text" style="white-space: nowrap">
        <p>
          Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import LoginVue from '@/components/Login/Login.vue';
import axios from "axios";
import store from "@/store";
export default {
  data: () => ({
    // test: "test ya",
    email: "",
    password: "",
  }),
  methods: {
    async handleLogin() {
      // console
      // console.log(this.$store)

      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("auth/login", credentials);
        const role = await this.$store.getters["auth/user"].role
        // ini cara ambil token
        // console.log(this.$store.state.auth.token);
        if(await role == "murid"){
          return this.$router.push("/murid_dashboard");
        } else if (role == "guru"){
          return this.$router.push("/guru_dashboard1");
        } else if (role == "admin"){
          return this.$router.push("/admin/");
        }
        // this.$router.push("/murid_dashboard");
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
