<template>
  <div class="d-flex mt-3 items-center justify-content-center mx-auto">
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
        <button class="buttons" style="margin-top:5px" id="text">
          <a style="text-decoration:none; color:black" href="http://localhost:5000/auth/google">Google</a>
        </button>

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
  async mounted() {
    try {
      //jika login menggunakan google
      if(this.$route.query.data){
        //ubah query menjadi json
        const data = JSON.parse(decodeURIComponent(this.$route.query.data))
        //simpan data ke desktop
        await this.$store.dispatch("auth/loginGoogle", data);
        //redirect halaman
        if ((data.data.role) == "murid") {
          return this.$router.push("/murid_dashboard");
        } else if (data.data.role == "guru") {
          return this.$router.push("/guru_dashboard1");
        } else if (data.data.role == "admin") {
          return this.$router.push("/admin/");
        }

      }
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
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
        const role = await this.$store.getters["auth/user"].role;
        // ini cara ambil token
        // console.log(this.$store.state.auth.token);
        if ((await role) == "murid") {
          return this.$router.push("/murid_dashboard");
        } else if (role == "guru") {
          return this.$router.push("/guru_dashboard1");
        } else if (role == "admin") {
          return this.$router.push("/admin/");
        }
        // this.$router.push("/murid_dashboard");
      } catch (err) {
        console.log(err);
      }
    },
    async google() {
      try {
        // http://localhost:3000/auth/google
        // await axios.get("auth/google")
        // await this.$store.dispatch("auth/google");
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
