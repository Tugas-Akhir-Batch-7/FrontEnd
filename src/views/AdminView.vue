<template>
  <main class="d-flex flex-nowrap">
    <sidebar />
    <!-- <RouterView /> -->
     <router-view />

  </main>
</template>

<script>
import sidebar from "@/components/Admin/sidebar.vue";
// import Sidebar from '../components/Admin/sidebar.vue';
import AdminService from "@/services/admin-service";

export default {
  components: {
    sidebar,
  },
};
</script>

<style>
</style>