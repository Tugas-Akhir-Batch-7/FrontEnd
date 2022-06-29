<style>
@import "../../assets/dashboard.css";
</style>

<template>
 
      <div class="p-3 d-flex flex-column flex-fill">
        <h2 class="mb-4">List Guru</h2>
        <br />
        <!--<p>{{token}}</p>-->
        <!--<button @click="klick">klick</button>-->
        <!-- <div>
          <button class="btn btn-primary px-5">Add</button>
        </div> -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(i, index) in listData"
              :key="i.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ i.User.name }}</td>
              <td>{{ i.User.email }}</td>
              <!-- <td>{{ i.pay }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
   
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
      listData: []
    }
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
      const dataGet = await AdminService.getListByRole("guru");
      this.listData = dataGet.data;
      // this.listData = response.data.data;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  }
};
</script>