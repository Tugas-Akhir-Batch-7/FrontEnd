<template>
  <div class="p-3 d-flex flex-column flex-fill">
    <h2 class="mb-4">Profile</h2>
    <br />

    <div class="row align-items-top">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="d-flex justify-content-center">
          <img :src="profile.photo" alt="..." width="400" />
        </div>
      </div>
      <div class="col-lg-7 px-xl-10">
        <div
          class="rounded bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9"
          style="min-width: 20em"
        >
          <h3 class="mb-0 text-white h2">{{ profile.name }}</h3>
          <span class="text-primary"
            >{{ profile.role }}
            <span v-if="isMurid">({{ profile.batch }})</span></span
          >
        </div>
        <ul class="list-unstyled mb-1-9">
          <li class="mb-2 mb-xl-3 display-28">
            <span class="display-26 text-secondary me-2 font-weight-600"
              >Email:</span
            >
            {{ profile.email }}
          </li>

          <div v-if="isMurid">
            <li class="mb-2 mb-xl-3 display-28">
              <span class="display-26 text-secondary me-2 font-weight-600"
                >Address:</span
              >
              <!-- reactivity object inside object must provide judgement -->
              <!-- https://stackoverflow.com/questions/68348231/vue3-object-deep-reactivity-works-fine-but-getting-error -->
              {{ profile.profile && profile.profile.address }}
            </li>

            <li class="mb-2 mb-xl-3 display-28">
              <span class="display-26 text-secondary me-2 font-weight-600"
                >Contact:</span
              >
              <!-- reactivity object inside object must provide judgement -->
              <!-- https://stackoverflow.com/questions/68348231/vue3-object-deep-reactivity-works-fine-but-getting-error -->
              {{ profile.profile && profile.profile.contact }}
            </li>
            <li class="mb-2 mb-xl-3 display-28">
              <span class="display-26 text-secondary me-2 font-weight-600"
                >Photo KTP</span
              >
              <!-- reactivity object inside object must provide judgement -->
              <!-- https://stackoverflow.com/questions/68348231/vue3-object-deep-reactivity-works-fine-but-getting-error -->
              <div>
                <a
                  :href="profile.profile && profile.profile.photo_ktp"
                  target="_blank"
                  ><img
                    :src="profile.profile && profile.profile.photo_ktp"
                    alt=""
                    width="100"
                  />
                </a>
              </div>
            </li>
          </div>

          <!-- <li class="mb-2 mb-xl-3 display-28">
            <span class="display-26 text-secondary me-2 font-weight-600"
              >Website:</span
            >
            www.example.com
          </li>
          <li class="display-28">
            <span class="display-26 text-secondary me-2 font-weight-600"
              >Phone:</span
            >
            507 - 541 - 4567
          </li> -->
        </ul>
        <div v-if="!id">
          <router-link to="/profile/edit" class="px-5 btn btn-warning"
            >Edit Profile</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";
import { onMounted, reactive, computed } from "vue";
// import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const { id } = route.params;

    let profile = reactive({});
    const fetchProfile = async () => {
      let fetchUrl;
      if (id) {
        fetchUrl = `/user/profile/${id}`;
      } else {
        fetchUrl = `/user/profile`;
      }
      const res = await axios.get(fetchUrl, {
        headers: await authHeader(),
      });
      console.log(res.data.data.profile);
      Object.assign(profile, res.data.data);
      // this.profile = data.data;
    };
    const isMurid = computed(() => profile.role === "murid");
    onMounted(async () => {
      await fetchProfile();
      // console.log(Object.keys(profile));
      let pattern = /^(http|https):\/\//;
      let isFullLink = pattern.test(profile.profile.photo_ktp);
      if (!isFullLink) {
        profile.profile.photo_ktp = `http://localhost:5000/img-ktp/${profile.profile.photo_ktp}`;
      }

      isFullLink = pattern.test(profile.photo);
      if (!isFullLink) {
        profile.photo = `http://localhost:5000/img-profile/${profile.photo}`;
      }

      console.log(isFullLink);
      console.log(id);
    });
    return {
      profile,
      isMurid,
      id
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