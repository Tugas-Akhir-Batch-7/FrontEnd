<style>
@import "../../assets/dashboard.css";
</style>

<template>
  <div>
    <main class="d-flex flex-nowrap">
      <sidebar />
      <div class="p-3 d-flex flex-column flex-fill">
        <h2 class="mb-4">List Tagihan</h2>
        <br />
        <!--<p>{{token}}</p>-->
        <!--<button @click="klick">klick</button>-->
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Total Tagihan</th>
              <th scope="col">DP</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in listData" :key="i.id">
              <td>{{ index + 1 }}</td>
              <td>{{ i.name }}</td>
              <td>{{ i.total_bill }}</td>
              <td>{{ i.dp }}</td>
              <td v-if="i.is_lunas">Lunas</td>
              <td v-else>Belum Lunas</td>
              <td><Button>Tets</Button></td>
              <!-- <td>{{ i.is_lunas}}</td> -->
              <!-- <td>{{ i.pay }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <!-- sidebar -->
    <!-- <div class="sidebar"></div> -->
  </div>
  <!-- navbar -->
</template>

<script>
import sidebar from "./sidebar.vue";
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
      // const token = await this.$store.getters["auth/token"];
      // axios.defaults.headers.common["token"] = this.token;

      // let response = await axios.get("admin/list-by-role?role=guru", {
      //   headers: {
      //    Authorization: 'Bearer ' + token
      //   }
      // });
      const dataGet = await AdminService.getTagihanList();
      this.listData = dataGet.data;
      // this.listData = response.data.data;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
};
</script>