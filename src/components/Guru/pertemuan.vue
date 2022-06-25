<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--<p>{{token}}</p>-->
    <!--<button @click="klick">klick</button>-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name Batch</th>
          <th scope="col">Name Pertemuan</th>
          <th scope="col">Keterangan</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, key) in listPertemuan" @click="detailPertemuan(i.id_pertemuan)" :class="{'bg-light':i.name_guru == username}">
          <td>{{key+1}}</td>
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
    token:'',
    listPertemuan:[],
    listMuridBatch:[],
    username: ''
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      this.username = await this.$store.getters["auth/user"].name
      //ambil list batch
      axios.defaults.headers.common['token'] = this.token;
      let response = await axios.get("guru/listPertemuan", {});
      this.listPertemuan = response.data.data
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async detailPertemuan(id){
      try{
        console.log(id)
        this.$router.push({ name: 'detailPertemuan', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>