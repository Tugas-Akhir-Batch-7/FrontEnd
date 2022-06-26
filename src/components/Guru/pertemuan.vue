<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--pertemuan-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Pertemuan</h3>
    </div>
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
        <tr v-if="listPertemuan.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listPertemuan">
          <td colspan="5" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(key, i) in listPertemuan" @click="detailPertemuan(key.id_pertemuan)" :class="{'bg-light':key.name_guru == username}">
          <td style="width:5%; text-align:center">{{i+1}}</td>
          <td>{{key.name_batch}}</td>
          <td>{{key.name_pertemuan}}</td>
          <td>{{key.keterangan}}</td>
          <td>{{key.date}}</td>
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
      if(this.listPertemuan.length == 0) this.listPertemuan = false
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