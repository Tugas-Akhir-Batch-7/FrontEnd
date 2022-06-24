<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--<p>{{token}}</p>-->
    <!--<button @click="klick">klick</button>-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name Batch</th>
          <th scope="col">Name Pertemuan</th>
          <th scope="col">Keterangan</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in listPertemuan" @click="infoMuridBatch(i.id)" class="bg-warning">
          <td>{{i.name_batch}}</td>
          <td>{{i.name_pertemuan}}</td>
          <td>{{i.keterangan}}</td>
          <td>{{i.date}}</td>
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
    listPertemuan:[],
    listMuridBatch:[],
    publicPath:'asda'
  }),
  async mounted() {
    try{
      //ambil list batch
      axios.defaults.headers.common['token'] = this.token.token;
      let response = await axios.get("guru/listPertemuan", {});
      this.listPertemuan = response.data.data
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
    async infoMuridBatch(id){
      try{
        this.$router.push({ name: 'anggotaBatch', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>