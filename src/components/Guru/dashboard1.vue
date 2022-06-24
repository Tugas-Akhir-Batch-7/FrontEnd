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
          <th scope="col">Start Date</th>
          <th scope="col">Pay</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in listBatch" @click="infoMuridBatch(i.id)">
          <td>{{i.name}}</td>
          <td>{{i.start_date}}</td>
          <td>{{i.pay}}</td>
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
    listMuridBatch:[],
    publicPath:'asda'
  }),
  async mounted() {
    try{
      //ambil list batch
      axios.defaults.headers.common['token'] = this.token.token;
      let response = await axios.get("guru/listBatch", {});
      this.listBatch = response.data.data
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
        // redirect: to => {return { path: '/search', query: { q: to.params.searchText } }
        // console.log(this.batch)
        // console.log(this.token.token)
        // axios.defaults.headers.common['token'] = this.token.token;
        // let response = await axios.get("guru/listAnggotaBatch/"+id, {});
        // console.log(response.data.data)
        // this.listMuridBatch = response.data.data
        // console.log(this.batch)
        console.log(this.$route)
        // console.log(this.$router)
        this.$router.push({ name: 'anggotaBatch', params: { id } })
        // this.$router.Push('home') 
        // this.$route.Push({name:'anggotaBatch', params:{id}}) 
        // window.location.href = 'anggota_batch/'+id
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>