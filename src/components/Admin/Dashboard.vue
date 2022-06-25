<style>
@import "../../assets/dashboard.css";
</style>

<template>
  <div>
    <main class="d-flex flex-nowrap">
      <sidebar />
      <div class="p-3 d-flex flex-column flex-fill">
        DASHBOARD ADMIN
        <!--<p>{{token}}</p>-->
        <!--<button @click="klick">klick</button>-->
        <!-- <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name Batch</th>
              <th scope="col">Start Date</th>
              <th scope="col">Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in listBatch"
              @click="infoMuridBatch(i.id)"
              :key="i.id"
            >
              <td>{{ i.name }}</td>
              <td>{{ i.start_date }}</td>
              <td>{{ i.pay }}</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </main>
    <!-- sidebar -->
    <!-- <div class="sidebar"></div> -->
  </div>
  <!-- navbar -->
</template>

<script>
import sidebar from "@/components/Admin/sidebar.vue";
export default {
  components: {
    sidebar,
  },
  onMounted() {
    
    // this.getListBatch();
  },
};
</script>