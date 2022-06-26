<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--Anggota Batch-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Aggota Batch</h3>
    </div>
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
        <tr v-if="listAnggotaBatch.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listAnggotaBatch">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listAnggotaBatch">
          <td>{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td>{{value.status}}</td>
          <td>{{value.address}}</td>
          <td v-if="value.status == 'mendaftar'" @click="accMurid(value.id_murid, key)">
            <button type="button" class="btn btn-sm btn-success m-0">accept</button>
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    
    <!--ujian-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Ujian  </h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddUjian = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshUjian()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveEditUjian()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Pengawas</th>
          <th scope="col">Time</th>
          <th scope="col">Date</th>
          <th scope="col" v-if="editMode"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listUjian.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listUjian">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listUjian" :class="{'table-danger':editMode && listDeleteUjian.includes(value.id)}" @click="scoreUjian(value.id)">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--name-->
          <td v-if="editMode && listEditUjian[key]"><input v-model="listEditUjian[key].name" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.name}}</td>
          <!--pengawas-->
          <td v-if="editMode && listEditUjian[key]"><input v-model="listEditUjian[key].pengawas" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.pengawas}}</td>
          <!--time-->
          <td v-if="editMode && listEditUjian[key]"><input v-model="listEditUjian[key].time" class="form-control form-control-sm" type="time"></td>
          <td v-else>{{value.time}}</td>
          <!--date-->
          <td v-if="editMode && listEditUjian[key]"><input v-model="listEditUjian[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td v-else>{{value.datetime}}</td>
          <!--delete-->
          <td style="width:5%;text-align:center" v-if="editMode && !listDeleteUjian.includes(value.id)" @click="listDeleteUjian.push(value.id)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editMode && listDeleteUjian.includes(value.id)" @click="listDeleteUjian.splice(listDeleteUjian.indexOf(value.id))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>

<!--modal add ujian-->
<div :class="{'d-block':displayAddUjian, 'd-none':!displayAddUjian}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddUjian = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Ujian</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddUjian()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date().toISOString().substring(0, 10))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddUjian = false">x</button>
        </div>
      </div>
    </div>
    <table class="table ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Pengawas</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listUjianBaru">
            <td style="width:5%; text-align:center">{{key+1}}</td>
            <td><input v-model="listUjianBaru[key].name" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].pengawas" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].time" class="form-control form-control-sm" type="time"></td>
            <td><input v-model="listUjianBaru[key].date" class="form-control form-control-sm" type="datetime-local"></td>
            <td style="width:5%; text-align:center" @click="listUjianBaru.splice(key, 1)">x</td>
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
    //batch
    listBatch:[],
    listAnggotaBatch:[],
    //ujian
    listUjian:[],
    listEditUjian:[],
    listDeleteUjian:[],
    listUjianBaru:[
      {name:'', pengawas:'', time:'', date:''},
      {name:'qwe', pengawas:'', time:'', date:''},
      {name:'', pengawas:'qwe', time:'', date:''},
      {name:'', pengawas:'', time:'02:00:00', date:''},
      {name:'qwe', pengawas:'qwe', time:'02:00:00', date:'2015-01-02T11:42'}
    ],
    displayAddUjian: false,
    editMode: false,
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      //get list anggota batch
      axios.defaults.headers.common['token'] = this.token;
      this.listAnggotaBatch = (await axios.get("guru/listAnggotaBatch/"+this.$route.params.id, {})).data.data
      if(this.listAnggotaBatch.length == 0) this.listAnggotaBatch = false
      console.log(this.listAnggotaBatch)
      //get list ujian
      this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      console.log(this.listUjian)
      //get list edit ujian
      this.listEditUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
      if(this.listEditUjian.length == 0) this.listEditUjian = false
      console.log(this.listEditUjian)
      console.log(new Date().toISOString().substring(0, 10))
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
        //ambil list anggota batch
        axios.defaults.headers.common['token'] = this.token;
        let response = await axios.get("guru/accAnggotaBatch/"+id, {});
        this.listAnggotaBatch[idList].status = 'terdaftar'
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddUjian(){
      try{
        // let addUjian = {tugasName:[], tugasDescription:[]}
        for(let i = 0; i < this.listUjianBaru.length; i++){
          if(this.listUjianBaru[i].name && this.listUjianBaru[i].pengawas){
            let addUjian = {}
            addUjian.name = this.listUjianBaru[i].name || null
            addUjian.pengawas = this.listUjianBaru[i].pengawas || null
            addUjian.time = this.listUjianBaru[i].time || null
            addUjian.date = this.listUjianBaru[i].date || null
            console.log(addUjian)
            console.log(await axios.post("guru/addUjian/"+this.$route.params.id, addUjian))
          }
        }
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        this.displayAddUjian = false
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listEditUjian.length == 0) this.listEditUjian = false
        console.log(this.listEditUjian)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveEditUjian(){
      try{
        //delete tugas
        for(let i = 0; i < this.listDeleteUjian.length; i++){
          await axios.delete("guru/deleteUjian/"+this.listDeleteUjian[i], {})
        }
        //edit tugas
        for(let i = 0; i < this.listEditUjian.length; i++){
          if(this.listEditUjian[i].name != this.listUjian[i].name || this.listEditUjian[i].time != this.listUjian[i].time ||
             this.listEditUjian[i].pengawas != this.listUjian[i].pengawas || this.listEditUjian[i].datetime != this.listUjian[i].datetime){
            console.log(this.listEditUjian[i])
            await axios.put("guru/updateUjian/"+this.listUjian[i].id, {
              name: this.listEditUjian[i].name, 
              pengawas: this.listEditUjian[i].pengawas,
              time: this.listEditUjian[i].time,
              date: this.listEditUjian[i].datetime,
            })
          }
        }
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        this.displayAddUjian = false
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listEditUjian.length == 0) this.listEditUjian = false
        console.log(this.listEditUjian)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshUjian(){
      try{
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        this.displayAddUjian = false
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listEditUjian.length == 0) this.listEditUjian = false
        console.log(this.listEditUjian)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async scoreUjian(id){
      try{
        console.log(id)
        this.editMode ? true : this.$router.push({ name: 'scoreUjian', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
  }
}
</script>