<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--tugas-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Tugas</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Add Score</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshTugas()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveAddAcore()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
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
        <tr v-if="listTugasSubmit.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listTugasSubmit">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listTugasSubmit">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td>{{value.name}}</td>
          <td >{{value.submit_date}}</td>
          <td >{{value.submit_link}}</td>
          <td v-if="editMode" style="width:10%; text-align:center"><input @keyup="cekScore(key)" v-model="listTugasSubmitAdd[key].score" class="form-control form-control-sm" type="number" min="1" max="100"></td>
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
export default {
  data: () => ({
    token:'',
    editMode:false,
    listTugasSubmit:[],
    listTugasSubmitAdd:[],
    //message
    displayMessage:false,
  }),
  async mounted() {
    try{
      //setup
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;
      //list tugas submit
      this.listTugasSubmit = (await axios.get("guru/listTugasSubmit/"+this.$route.params.id, {})).data.data
      if(this.listTugasSubmit.length == 0) this.listTugasSubmit = false
      //clone tugas submit
      this.listTugasSubmitAdd = JSON.parse(JSON.stringify(this.listTugasSubmit))
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async cekScore(i){
      try{
        this.listTugasSubmitAdd[i].score > 100 ? this.listTugasSubmitAdd[i].score = 100 : this.listTugasSubmitAdd[i].score = Number.parseInt(this.listTugasSubmitAdd[i].score)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshTugas(ket, status){
      try{
      //list tugas submit
      this.listTugasSubmit = (await axios.get("guru/listTugasSubmit/"+this.$route.params.id, {})).data.data
      if(this.listTugasSubmit.length == 0) this.listTugasSubmit = false
      //clone tugas submit
      this.listTugasSubmitAdd = JSON.parse(JSON.stringify(this.listTugasSubmit))
      //ket
      if(ket) this.messageF(ket, status)
      else this.messageF(`Refresh Tugas`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddAcore(){
      try{        
        //edit tugas
        for(let i = 0; i < this.listTugasSubmit.length; i++){
          if(this.listTugasSubmit[i].score != this.listTugasSubmitAdd[i].score){
            await axios.post("guru/addScoreTugas/"+this.listTugasSubmitAdd[i].id_tugas, {
              [this.listTugasSubmitAdd[i].id]: this.listTugasSubmitAdd[i].score
            })
          }
        }
        this.refreshTugas(`Berhasil Mengupdate Score Tugas Submit`, true)
        this.editMode = false
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