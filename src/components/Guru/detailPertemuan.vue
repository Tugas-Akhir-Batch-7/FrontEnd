<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Absensi</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-danger" @click="refreshAbsen()">refresh</button>
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAbsen()">save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listAbsen"  @click="absensi(key)">
          <td>{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td :class="{'table-success':value.id_absen, 'table-danger':!value.id_absen}">{{value.id_absen ? 'hadir':'tidak hadir'}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listTugas">
          <td>{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.description}}</td>
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
    listBatch:[],
    listAbsen:[],
    listAbsenCp:[],
    listTugas:[],
    listUpdate:{},
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      //ambil list anggota batch
      axios.defaults.headers.common['token'] = this.token;
      this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async klick(){
      try{
        // alert("Hello Vue Simple Alert.");
        console.log(this.token.token)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshAbsen(){
      try{
        axios.defaults.headers.common['token'] = this.token;
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
        this.listUpdate = {}
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAbsen(){
      try{
        axios.defaults.headers.common['token'] = this.token;
        await axios.post("guru/prosesAbsensi/"+this.$route.params.id, this.listUpdate)
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async absensi(i){
      try{
        this.listUpdate[this.listAbsen[i].id_murid] = this.listAbsen[i].id_absen ? 'x':'y'
        this.listAbsen[i].id_absen = this.listAbsen[i].id_absen ? null : true
        console.log(this.listUpdate)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>