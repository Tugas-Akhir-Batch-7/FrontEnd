<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <div class="card" style="margin-bottom:3%">
      <h3 class="card-header text-warning">Detail</h3>
      <div class="card-body">
        <table class="table table-borderless align-middle m-0" v-if="listBatchSatuan.name">
          <tr>
            <td style="width:10%">Name</td>
            <td style="width:2%">:</td>
            <td style="">{{listBatchSatuan.name}}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>:</td>
            <td>{{moment(listBatchSatuan.start_date).format('DD MMMM YYYY')}}</td>
          </tr>
          <tr>
            <td>Pay</td>
            <td>:</td>
            <td>{{listBatchSatuan.pay}}</td>
          </tr>
        </table>
        <div v-else class="text-center w-100">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <!--Anggota Batch-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Aggota Batch</h3>
    </div>
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="text-center" scope="col">Username</th>
          <th class="text-center" scope="col">Email</th>
          <th class="text-center" scope="col">Status</th>
          <th class="text-center" scope="col">Address</th>
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
          <td class="text-center">{{value.status}}</td>
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
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddUjian = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshUjian()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveEditUjian()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle" style="margin-bottom:2em">
      <thead>
        <tr>
          <th class="text-center" style="width:1%" scope="col"></th>
          <th class="text-center" style="width:1%" scope="col" v-if="!editMode"></th>
          <th class="text-center" style="width:30%" scope="col">Name</th>
          <th class="text-center" style="width:30%" scope="col">Pengawas</th>
          <th class="text-center" style="width:10%" scope="col">Time</th>
          <th class="text-center" style="width:27%" scope="col">Date</th>
          <th class="text-center" style="width:1%" scope="col" v-if="editMode"></th>
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
        <tr v-for="(value, key) in listUjian" :class="{'table-danger':editMode && listDeleteUjian.includes(value.id)}">
          <td>{{key+1}}</td>
          <td v-if="!editMode">
              <button class="btn btn-sm btn-outline-warning" type="button" @click="scoreUjian(value.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
          </td>
          <!--name-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].name" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.name}}</td>
          <!--pengawas-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].pengawas" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.pengawas}}</td>
          <!--time-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].time" class="form-control form-control-sm" type="time"></td>
          <td class="text-center" v-else>{{value.time}}</td>
          <!--date-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td class="text-center" v-else>{{value.date1}}</td>
          <!--delete-->
          <td v-if="editMode && !listDeleteUjian.includes(value.id)" @click="listDeleteUjian.push(value.id)">
            <button type="button" class="btn btn-sm btn-outline-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
            </button>
          </td>
          <td class="align-middle" v-if="editMode && listDeleteUjian.includes(value.id)" @click="listDeleteUjian.splice(listDeleteUjian.indexOf(value.id))">
            <button type="button" class="btn btn-sm btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </td>
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
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})">+</button>
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

<!--modal message-->
<div v-if="displayMessage" class="min-vw-100 position-fixed top-0 text-center" style="">
  <div :class="{'alert-danger': !messageStatus, 'alert-success':messageStatus}" class="alert d-none d-lg-block">{{message}}</div>
</div>
</template>
<script setup>
  import sidebar from './sidebar.vue';
</script>
<script>
import axios from "axios";
import moment from 'moment';
moment().format();
export default {
  data: () => ({
    //batch
    listBatchSatuan:{},
    listAnggotaBatch:[],
    //ujian
    listUjian:[],
    listEditUjian:[],
    listDeleteUjian:[],
    listUjianBaru:[
      {name:'', pengawas:'', time:'02:00:00', date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))}
    ],
    displayAddUjian: false,
    editMode: false,
    //message
    displayMessage:false,
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;

      //get list batch satuan
      this.listBatchSatuan = (await axios.get("guru/listBatchSatuan/"+this.$route.params.id, {})).data.data

      //get list anggota batch / peserta batch
      this.listAnggotaBatch = (await axios.get("guru/listAnggotaBatch/"+this.$route.params.id, {})).data.data
      if(this.listAnggotaBatch.length == 0) this.listAnggotaBatch = false

      //get list ujian
      this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      for(let i = 0; i < this.listUjian.length; i++){
        this.listUjian[i].date1 = moment(this.listUjian[i].date).format('dddd, DD MMMM YYYY, HH:mm')
        this.listUjian[i].date2 = moment(this.listUjian[i].date).format()
        this.listUjian[i].datetime = moment(this.listUjian[i].date).format('YYYY-MM-DDTHH:mm')
      }
      //clone list Ujian
      this.listEditUjian = JSON.parse(JSON.stringify(this.listUjian))
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async accMurid(id, idList){
      try{
        //ambil list anggota batch
        axios.defaults.headers.common['token'] = this.token;
        await axios.get("guru/accAnggotaBatch/"+id);
        this.listAnggotaBatch[idList].status = 'terdaftar'
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddUjian(){
      try{
        // let addUjian = {tugasName:[], tugasDescription:[]}
        while(this.listUjianBaru.length){
          if(new Date(this.listUjianBaru[0].date) <= new Date()){
            this.messageF(`Date Tidak Valid`, false)
            throw 'Date Tidak Valid'
          }else if(this.listUjianBaru[0].name && this.listUjianBaru[0].pengawas && this.listUjianBaru[0].time && this.listUjianBaru[0].date){
            await axios.post("guru/addUjian/"+this.$route.params.id, {
              name: this.listUjianBaru[0].name,
              pengawas: this.listUjianBaru[0].pengawas,
              time: this.listUjianBaru[0].time,
              date: this.listUjianBaru[0].date,
            })
          }else{
            this.messageF(`Lengkapi Semua Data`, false)
            throw 'lengkapi semua data'
          }
          this.listUjianBaru.splice(0,1)
        }
        this.refreshUjian(`berhasil menambahkan Ujian`, true)
        this.displayAddUjian = false
        this.listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})
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
            if(new Date(this.listEditUjian[i].datetime) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            await axios.put("guru/updateUjian/"+this.listUjian[i].id, {
              name: this.listEditUjian[i].name, 
              pengawas: this.listEditUjian[i].pengawas,
              time: this.listEditUjian[i].time,
              date: this.listEditUjian[i].datetime,
            })
          }
        }
        this.editMode = false
        this.refreshUjian(`Berhasil Mengupdate Ujian`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshUjian(ket, status){
      try{
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        //clone list Ujian
        for(let i = 0; i < this.listUjian.length; i++){
          this.listUjian[i].date1 = moment(this.listUjian[i].date).format('dddd, DD MMMM YYYY, HH:mm')
          this.listUjian[i].date2 = moment(this.listUjian[i].date).format()
          this.listUjian[i].datetime = moment(this.listUjian[i].date).format('YYYY-MM-DDTHH:mm')
        }
        this.listEditUjian = JSON.parse(JSON.stringify(this.listUjian))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh materi`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async scoreUjian(id){
      try{
        this.editMode ? true : this.$router.push({ name: 'scoreUjian', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    messageF(text, s){
      this.displayMessage = true
      this.messageStatus = s
      this.message = text || 'terjadi error'
      setTimeout(()=>{
        this.displayMessage = false
        this.message = `terjadi error`
      }, 3000)
    }
  }
}
</script>