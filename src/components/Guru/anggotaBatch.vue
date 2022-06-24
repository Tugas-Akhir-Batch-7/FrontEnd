<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listAnggotaBatch">
          <td>{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td>{{value.status}}</td>
          <td>{{value.address}}</td>
          <td v-if="value.status == 'mendaftar'" @click="accMurid(value.id_murid, key)">
            <button type="button" class="btn btn-success m-0">accept</button>
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
    
</template>
<script setup>
  import sidebar from './sidebar.vue';
</script>
<script>
import axios from "axios";
export default {
  data: () => ({
    token:JSON.parse(localStorage.getItem("user")),
    listBatch:[],
    listAnggotaBatch:[],
    publicPath:'asda',
  }),
  async mounted() {
    try{
      //ambil list anggota batch
      axios.defaults.headers.common['token'] = this.token.token;
      let response = await axios.get("guru/listAnggotaBatch/"+this.$route.params.id, {});
      this.listAnggotaBatch = response.data.data
      console.log(this.listAnggotaBatch)
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async klick(){
      try{
        console.log(this.token.token)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async accMurid(id, idList){
      try{
        console.log(id)
        console.log(idList)
        //ambil list anggota batch
        axios.defaults.headers.common['token'] = this.token.token;
        let response = await axios.get("guru/accAnggotaBatch/"+id, {});
        console.log(response)
        this.listAnggotaBatch[idList].status = 'terdaftar'
        console.log(this.listAnggotaBatch)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>