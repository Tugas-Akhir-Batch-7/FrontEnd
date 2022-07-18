<template>
  <main class="d-flex flex-nowrap">
    <sidebarAdmin v-if="authRole === 'admin'" />
    <sidebar-guru v-else-if="authRole === 'guru'" />
    <sidebar-murid v-else />

    <div class="pt-5 overflow-hidden w-100" style="padding-bottom: 100px">
      <router-view />
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import store from "@/store";
import sidebarAdmin from "../components/Admin/sidebar.vue";
import sidebarGuru from "../components/Guru/sidebar.vue";
import sidebarMurid from "../components/Murid/sidebar.vue";

export default {
  components: { sidebarAdmin, sidebarGuru, sidebarMurid },
  setup() {
    // let currentRole = ref("")
    const authRole = computed(() => {
      return store.getters["auth/user"].role;
    });
    onMounted(() => {
    //   console.log(authRole.value);
    });
    return {
      //
      authRole,
    };
  },
};
</script>

<style>
</style>