<template>

<main class="container p-5 form-signin w-100 m-auto">
  <form>
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
      <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
      <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
    </svg>
    <h1 class="h3 mb-3 fw-normal">Sign In</h1>

    <div class="form-floating m-2">
      <input
        class="form-control"
        type="email"
        name="email"
        id="textA"
        placeholder="Your E-mail"
        v-model="email"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating m-2">
      <input
        class="form-control"
        type="password"
        name="password"
        id="text"
        placeholder="Password"
        v-model="password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-secondary" type="button" @click="login">Sign in</button>
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
  </form>
</main>
</template>
<script>
// import LoginVue from '@/components/Login/Login.vue';
import axios from "axios";
export default {
  data: () => ({
    test: "test ya",
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      // console
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        // console.log(this.email)
        // console.log(this.password)
        let response = await axios.post("login", credentials);
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(localStorage.getItem("user"));
        }
        // this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
