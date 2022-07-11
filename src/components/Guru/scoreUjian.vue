<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <div class="card" style="margin-bottom:3%">
      <h3 class="card-header text-warning">Detail</h3>
      <div class="card-body">
        <table class="table table-borderless align-middle" v-if="ujianSatuan.name">
          <tr>
            <td style="width:10%">Name Ujian</td>
            <td style="width:2%">:</td>
            <td style="">{{ujianSatuan.name}}</td>
          </tr>
          <tr>
            <td>Pengawas</td>
            <td>:</td>
            <td>{{ujianSatuan.pengawas}}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>:</td>
            <td>{{ujianSatuan.time}}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>:</td>
            <td>{{moment(ujianSatuan.date).format('dddd, DD MMMM YYYY, HH:mm')}}</td>
          </tr>
        </table>
        <div v-else class="text-center w-100">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <!--tugas-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Score Ujian</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Add Score</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshUjianSubmit()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveAddAcore()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Date Sumbit</th>
          <th scope="col">Link Submit</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listUjianSubmit.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listUjianSubmit">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listUjianSubmit">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td>{{value.name}}</td>
          <td >{{value.submit_date}}</td>
          <td >{{value.submit_link}}</td>
          <td v-if="editMode" style="width:10%; text-align:center"><input @keyup="cekScore(key)" v-model="listUjianSubmitAdd[key].score" class="form-control form-control-sm" type="number" min="1" max="100"></td>
          <td v-else style="width:5%; text-align:center">{{value.score || '-'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
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
    token:'',
    editMode:false,
    ujianSatuan: {},
    listUjianSubmit:[],
    listUjianSubmitAdd:[],
    //message
    displayMessage:false,
  }),
  async mounted() {
    try{
      //setup
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;

      //ambil data ujian
      this.ujianSatuan = (await axios.get("guru/ujianSatuan/"+this.$route.params.id, {})).data.data

      //ambil list ujian submit
      this.listUjianSubmit = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
      if(this.listUjianSubmit.length == 0) this.listUjianSubmit = false
      for(let i = 0; i < this.listUjianSubmit.length; i++){
        this.listUjianSubmit[i].submit_date = moment(this.listUjianSubmit[i].date).format('DD MMMM YYYY, HH:mm')
      }
      this.listUjianSubmitAdd = JSON.parse(JSON.stringify(this.listUjianSubmit))
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async cekScore(i){
      try{
        this.listUjianSubmitAdd[i].score > 100 ? this.listUjianSubmitAdd[i].score = 100 : this.listUjianSubmitAdd[i].score = Number.parseInt(this.listUjianSubmitAdd[i].score)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshUjianSubmit(ket, status){
      try{
        this.listUjianSubmit = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
        if(this.listUjianSubmit.length == 0) this.listUjianSubmit = false
        this.listUjianSubmitAdd = JSON.parse(JSON.stringify(this.listUjianSubmit))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`Refresh Batch`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddAcore(){
      try{        
        //edit tugas
        for(let i = 0; i < this.listUjianSubmit.length; i++){
          if(this.listUjianSubmit[i].score != this.listUjianSubmitAdd[i].score){
            await axios.post("guru/addScoreUjian/"+this.listUjianSubmitAdd[i].id_ujian, {
              [this.listUjianSubmitAdd[i].id]: this.listUjianSubmitAdd[i].score
            })
          }
        }
        this.refreshUjianSubmit(`Berhasil Mengupdate Score Ujian Submit`, true)
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