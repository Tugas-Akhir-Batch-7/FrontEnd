<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--absensi-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Absensi</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-danger" @click="refreshAbsen()">Refresh</button>
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAbsen()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th style="text-align:center" scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listAbsen" @click="absensi(key)">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td style="width:10%; text-align:center" :class="{'table-success':value.id_absen, 'table-danger':!value.id_absen}">{{value.id_absen ? 'hadir':'tidak hadir'}}</td>
        </tr>
      </tbody>
    </table>

    <!--tugas-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Tugas</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddTugasP = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshTugas()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveTugas()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col" v-if="editMode"></th>
          <th scope="col" v-if="editMode"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listTugas" :class="{'table-danger':editMode && listDeleteTugas.includes(value.id)}">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--name-->
          <td class="w-25" v-if="editMode && listEditTugas[key]"><input v-model="listEditTugas[key].name" class="form-control form-control-sm" type="text"></td>
          <td class="w-25" v-else>{{value.name}}</td>
          <!--description-->
          <td v-if="editMode && listEditTugas[key]"><input v-model="listEditTugas[key].description" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.description}}</td>
          <!--delete-->
          <td style="text-align:center" v-if="editMode && !listDeleteTugas.includes(value.id)" @click="listDeleteTugas.push(value.id)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="text-align:center" v-if="editMode && listDeleteTugas.includes(value.id)" @click="listDeleteTugas.splice(listDeleteTugas.indexOf(value.id))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>

<!--modal add tugas-->
<div :class="{'d-block':displayAddTugasP, 'd-none':!displayAddTugasP}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddTugasP = false"></div>
  <div class="min-vw-80 bg-light p-3" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Tugas</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddTugas()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listTugasBaru.push({name:'',description:''})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddTugasP = false">x</button>
        </div>
      </div>
    </div>
    <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listTugasBaru">
            <td style="width:5%; text-align:center">{{key+1}}</td>
            <td class="w-25"><input v-model="listTugasBaru[key].name" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listTugasBaru[key].description" class="form-control form-control-sm" type="text"></td>
            <td style="width:5%; text-align:center" @click="listTugasBaru.splice(key, 1)">x</td>
          </tr>
        </tbody>
      </table>
  </div>
</div>
</template>
<script setup>
  import sidebar from './sidebar.vue';
</script>
<script>
import axios from "axios";
export default {
  data: () => ({
    token:'',
    editMode:false,
    listBatch:[],
    listAbsen:[],
    listTugas:[],
    listEditTugas:[],
    listDeleteTugas:[],
    listTugasBaru:[
      {name:'', description:''},
      {name:'qwe', description:''},
      {name:'', description:'asd'},
      {name:'zxc', description:'qaz'},
    ],
    displayAddTugasP:false,
    listUpdate:{},
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      //ambil list anggota batch
      axios.defaults.headers.common['token'] = this.token;
      this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
      this.listEditTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
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
    async saveAddTugas(){
      try{
        let addTugas = {tugasName:[], tugasDescription:[]}
        for(let i = 0; i < this.listTugasBaru.length; i++){
          if(this.listTugasBaru[i].name){
            addTugas.tugasName.push(this.listTugasBaru[i].name)
            addTugas. tugasDescription.push(this.listTugasBaru[i].description)
          }
        }
        if(addTugas.tugasName.length) addTugas = (await axios.post("guru/addTugas/"+this.$route.params.id, addTugas)).data.data
        this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        this.displayAddTugasP = false
        console.log(addTugas)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    // async saveTugas(){
    //   try{
    //     console.log(this.listEditTugas)
    //     console.log(this.listTugas)
    //     // this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
    //     // this.listUpdate = {}
    //   }catch(err){
    //     console.log("error")
    //     console.log(err)
    //   }
    // },
    async deteleTugas(id, i){
      try{
        console.log(id)
        console.log(i)
        // this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
        // this.listUpdate = {}
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshTugas(){
      try{
        this.listEditTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        this.listDeleteTugas = []
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveTugas(){
      try{
        //delete tugas
        console.log(this.listDeleteTugas)
        for(let i = 0; i < this.listDeleteTugas.length; i++){
          console.log(this.listDeleteTugas[i])
          await axios.delete("guru/deleteTugas/"+this.listDeleteTugas[i], {})
        }

        this.listEditTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        this.listDeleteTugas = []
        // await axios.post("guru/prosesAbsensi/"+this.$route.params.id, this.listUpdate)
        // this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshAbsen(){
      try{
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
        this.listUpdate = {}
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAbsen(){
      try{
        await axios.post("guru/prosesAbsensi/"+this.$route.params.id, this.listUpdate)
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async absensi(i){
      try{
        // console.log(!this.listAbsen[i].id_absen)
        // console.log( this.listAbsen[i].id_absen ? false : true)
        this.listUpdate[this.listAbsen[i].id_murid] = this.listAbsen[i].id_absen ? 'x':'y'
        this.listAbsen[i].id_absen = this.listAbsen[i].id_absen ? false : true
        // console.log(this.listAbsen[i].id_absen)
        // console.log(this.listUpdate)
        // console.log(this.listAbsen)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    }
  }
}
</script>