<template>
  <div class="p-3 d-flex flex-column flex-fill">
    <h2 class="mb-4">Profile Edit</h2>
    <br />

    <div class="row align-items-center">
      <div class="col-lg-5 mb-4 mb-lg-0">
        <div class="d-flex justify-content-center">
          <img :src="profile.photo" alt="..." width="400" />
        </div>
      </div>
      <div class="col-lg-4 px-xl-10">
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              v-model="profile.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Nama Anda"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="profile.email"
              disabled
              type="text"
              class="form-control"
              id="email"
              placeholder="email@email.com"
            />
          </div>
          <div v-if="isMurid">
            <label for="address" class="form-label">Address</label>
            <input
              v-model="profile.profile.address"
              type="text"
              class="form-control"
              id="address"
              placeholder="Jalan penuh bebatuan"
            />
            <label for="address" class="form-label">Contact</label>
            <input
              v-model="profile.profile.contact"
              type="text"
              class="form-control"
              id="contact"
              placeholder="62841242094"
            />
          </div>
          <div class="my-4">
            <input class="btn btn-warning px-5" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  {{isMurid}}

  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";
import { onMounted, reactive, computed } from "vue";
import store from "../store";
import { useRouter } from "vue-router";
export default {
  setup() {
    let profile = reactive({});
    const route = useRouter()

    const isMurid = computed(() => profile.role === "murid");

    const fetchProfile = async () => {
      const res = await axios.get("/user/profile", {
        headers: await authHeader(),
      });
      // console.log(res.data);
      Object.assign(profile, res.data.data);
      // this.profile = data.data;
    };
    
    const updateProfile = async () => {
      profile.address = profile.profile.address;
      profile.contact = profile.profile.contact;
      await store.dispatch("auth/updateProfile", profile);

      await route.push('/profile')
    //   console.log(res.data);
    };
    onMounted(async () => {
      await fetchProfile();
      // console.log(isMurid);
      // console.log('aziz');
      // console.log(isMurid);
    });
    return {
      profile,
      updateProfile,
      isMurid
      // token: this.$store.getters["auth/token"]
    };
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
}
.card-style1 {
  box-shadow: 0px 0px 10px 0px rgb(89 75 128 / 9%);
}
.border-0 {
  border: 0 !important;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

section {
  padding: 1em 0;
  overflow: hidden;
  background: #fff;
}
.mb-2-3,
.my-2-3 {
  margin-bottom: 2.3rem;
}

.section-title {
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}
.text-primary {
  color: #ceaa4d !important;
}
.text-secondary {
  color: #15395a !important;
}
.font-weight-600 {
  font-weight: 600;
}
.display-26 {
  font-size: 1.3rem;
}

@media screen and (min-width: 992px) {
  .p-lg-7 {
    padding: 4rem;
  }
}
@media screen and (min-width: 768px) {
  .p-md-6 {
    padding: 3.5rem;
  }
}
@media screen and (min-width: 576px) {
  .p-sm-2-3 {
    padding: 2.3rem;
  }
}
.p-1-9 {
  padding: 1.9rem;
}

.bg-secondary {
  background: #15395a !important;
}
@media screen and (min-width: 576px) {
  .pe-sm-6,
  .px-sm-6 {
    padding-right: 3.5rem;
  }
}
@media screen and (min-width: 576px) {
  .ps-sm-6,
  .px-sm-6 {
    padding-left: 3.5rem;
  }
}
.pe-1-9,
.px-1-9 {
  padding-right: 1.9rem;
}
.ps-1-9,
.px-1-9 {
  padding-left: 1.9rem;
}
.pb-1-9,
.py-1-9 {
  padding-bottom: 1.9rem;
}
.pt-1-9,
.py-1-9 {
  padding-top: 1.9rem;
}
.mb-1-9,
.my-1-9 {
  margin-bottom: 1.9rem;
}
@media (min-width: 992px) {
  .d-lg-inline-block {
    display: inline-block !important;
  }
}
.rounded {
  border-radius: 0.25rem !important;
}
</style>