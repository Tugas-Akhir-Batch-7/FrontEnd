<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--tugas-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Score Ujian</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Add Score</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshUjian()">Reset</button>
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
    listUjianSubmit:[],
    listUjianSubmitAdd:[],
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      //ambil list anggota batch
      axios.defaults.headers.common['token'] = this.token;
      this.listUjianSubmit = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
      if(this.listUjianSubmit.length == 0) this.listUjianSubmit = false
      this.listUjianSubmitAdd = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async cekScore(i){
      try{
        this.listUjianSubmitAdd[i].score > 100 ? this.listUjianSubmitAdd[i].score = 100 : this.listUjianSubmitAdd[i].score = Number.parseInt(this.listUjianSubmitAdd[i].score)
        console.log( Number.isSafeInteger(this.listUjianSubmitAdd[i].score) )
        console.log( Number.parseInt(this.listUjianSubmitAdd[i].score) )
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshUjian(){
      try{
        console.log("jalan")
        this.listUjianSubmit = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
        this.listUjianSubmitAdd = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
        if(this.listUjianSubmit.length == 0) this.listUjianSubmit = false
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
            console.log(this.listUjianSubmit[i])
            console.log({[this.listUjianSubmitAdd[i].id]: this.listUjianSubmitAdd[i].score})
            console.log(await axios.post("guru/addScoreUjian/"+this.listUjianSubmitAdd[i].id_ujian, {
              [this.listUjianSubmitAdd[i].id]: this.listUjianSubmitAdd[i].score
            }))
          }
        }
        this.listUjianSubmit = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
        this.listUjianSubmitAdd = (await axios.get("guru/listUjianSubmit/"+this.$route.params.id, {})).data.data
        if(this.listUjianSubmit.length == 0) this.listUjianSubmit = false
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
  }
}
</script>