<template>
  <main class="d-flex flex-nowrap">
    <sidebar />
    <div class="pt-5 overflow-hidden w-100" style="padding-bottom: 70px">
      <router-view />
    </div>
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