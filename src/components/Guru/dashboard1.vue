<template>
  <main class="d-flex flex-nowrap">
    <sidebar />
    <div class="p-3 d-flex flex-column flex-fill">
      <!--<p>{{token}}</p>-->
      <!--<button @click="klick">klick</button>-->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name Batch</th>
            <th scope="col">Start Date</th>
            <th scope="col">Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listBatch"  @click="infoMuridBatch(value.id)">
            <td style="width:5%; text-align:center">{{key+1}}</td>
            <td>{{value.name}}</td>
            <td>{{value.start_date}}</td>
            <td>{{value.pay}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script setup>
import sidebar from "./sidebar.vue";
</script>
<script>
import axios from "axios";
// const tokenStore = 

export default {
  data: () => ({
    // token:JSON.parse(localStorage.getItem("user")),
    token: "",
    listBatch: [],
    listMuridBatch: [],
    publicPath: "asda",
  }),
  async mounted() {
    try {
      //ambil list batch
      this.token = await this.$store.getters["auth/token"]

      axios.defaults.headers.common["token"] = this.token;
      console.log('test')

      let response = await axios.get("guru/listBatch", {});
      this.listBatch = response.data.data;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
  methods: {
    async klick() {
      try {
        console.log(this.token.token);
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    },
    async infoMuridBatch(id) {
      try {
        this.$router.push({ name: "anggotaBatch", params: { id } });
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    },
  },
};
</script>