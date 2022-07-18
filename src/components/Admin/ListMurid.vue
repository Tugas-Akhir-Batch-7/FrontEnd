<style>
@import "../../assets/dashboard.css";
</style>

<template>
  <div class="p-3 d-flex flex-column flex-fill">
    <h2 class="mb-4">List Guru</h2>
    <br />
    <!--<p>{{token}}</p>-->
    <!--<button @click="klick">klick</button>-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in listData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ i.User.name }}</td>
          <td>{{ i.User.email }}</td>
          <td>{{ i.status }}</td>
          <td><router-link :to="`/profile/${i.id_user}`" class="btn btn-dark">Detail</router-link></td>
          <!-- <td>{{ i.pay }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
  <!-- navbar -->
</template>

<script>
import sidebar from "./sidebar.vue";
import axios from "axios";
import AdminService from "../../services/admin-service";
export default {
  components: {
    sidebar,
  },
  data() {
    return {
      listData: [],
    };
  },
  async mounted() {
    try {
      const dataGet = await AdminService.getListByRole("murid");
      this.listData = dataGet.data;
      console.log(this.listData);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
};
</script>