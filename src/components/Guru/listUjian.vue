<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
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
          <th scope="col"></th>
          <th v-if="!editMode" scope="col"></th>
          <th class="text-center" scope="col">Batch</th>
          <th class="text-center" scope="col">Name Ujian</th>
          <th class="text-center" scope="col">Pengawas</th>
          <th class="text-center" scope="col">Time</th>
          <th class="text-center" scope="col">Date</th>
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
        <tr v-for="(value, key) in listUjian" :class="{'table-danger':editMode && listDeleteUjian.includes(value.id)}">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td v-if="!editMode" style="width:5%; text-align:center">
            <button class="btn btn-sm btn-outline-warning" type="button" @click="scoreUjian(value.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </td>
          <!--name batch-->
          <td>{{value.name_batch}}</td>
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
          <td class="text-center" v-else>{{new Date(value.date).toUTCString().substring(0,26)}}</td>
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
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddUjian = false">x</button>
        </div>
      </div>
    </div>
    <table class="table ">
        <thead>
          <tr>
            <th style="width:5%" scope="col"></th>
            <th style="width:20%" scope="col">Name Batch</th>
            <th style="width:20%" scope="col">Name Ujian</th>
            <th style="width:20%" scope="col">Pengawas</th>
            <th style="width:10%" scope="col">Time</th>
            <th style="width:20%" scope="col">Date</th>
            <th style="width:5%" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listUjianBaru">
            <td class="text-center">{{key+1}}</td>
            <td class="position-relative">
              <!--<select v-model="listUjianBaru[key].nameBatch" class="form-select form-select-sm" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value=""></option>
                <option v-for="(value1, key1) in listBatch">{{value1.name}}</option>
              </select>-->
              <input v-model="listUjianBaru[key].nameBatch" @focus="value.modeAddBatch=true" @blur="modeAddBatchF(key)" class="form-control form-control-sm" style="z-index:2" type="text">
              <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeAddBatch, 'd-block':value.modeAddBatch}" style="z-index:3">
                <div  style="height:30vh; width:12vw">
                  <span v-for="(value1, key1) in listBatch">
                    <span v-if="!listUjianBaru[key].nameBatch || value1.name.toLowerCase().includes(listUjianBaru[key].nameBatch.toLowerCase())" @click="listUjianBaru[key].nameBatch = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</span>
                  </span>
                </div>
              </div>
            </td>
            <td><input v-model="listUjianBaru[key].name" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].pengawas" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].time" class="form-control form-control-sm" type="time"></td>
            <td><input v-model="listUjianBaru[key].date" class="form-control form-control-sm" type="datetime-local"></td>
            <td class="text-center" @click="listUjianBaru.splice(key, 1)">x</td>
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
export default {
  data: () => ({
    //batch
    listBatch:[],
    //ujian
    listUjian:[],
    listEditUjian:[],
    listDeleteUjian:[],
    listUjianBaru:[
      {name:'', pengawas:'', time:'02:00:00', date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))}
    ],
    displayAddUjian: false,
    modeAddBatch: false,
    editMode: false,
    //message
    message: 'terjadi error',
    messageStatus: true,
    displayMessage: false,
  }),
  async mounted() {
    try{
      //setup
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;

      //get list ujian
      this.listUjian = (await axios.get("guru/listUjianGuru", {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      //clone list ujian
      this.listEditUjian = JSON.parse(JSON.stringify(this.listUjian))
      //get list batch
      this.listBatch = (await axios.get("guru/listBatch", {})).data.data
      if(this.listBatch.length == 0) this.listBatch = false      
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async modeAddBatchF(i){
      try{
        setTimeout(()=>{
          this.listUjianBaru[i].modeAddBatch=false
        }, 200)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddUjian(){
      try{
        // let addUjian = {tugasName:[], tugasDescription:[]}
        let id = null
        for(let i = 0; this.listUjianBaru.length; i){
          if(this.listUjianBaru[i].nameBatch && this.listUjianBaru[i].name && this.listUjianBaru[i].pengawas && this.listUjianBaru[i].time && this.listUjianBaru[i].date){
            let addUjian = {}
            id = null
            for(let o = 0; o < this.listBatch.length; o++){
              if(this.listUjianBaru[i].nameBatch == this.listBatch[o].name){
               id = this.listBatch[o].id
              }
            }
            if(!id) { //jika nama batch yang diinputkan tidak tersedia di nama batch
              this.messageF(`batch ${this.listUjianBaru[i].nameBatch} tidak tersedia`, false)
              throw "batch tidak tersedia"
            }else if(new Date(this.listUjianBaru[i].date) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            await axios.post("guru/addUjian/"+id, {
              name: this.listUjianBaru[i].name,
              pengawas: this.listUjianBaru[i].pengawas,
              time: this.listUjianBaru[i].time,
              date: this.listUjianBaru[i].date,
            })
          }else{
            this.messageF(`Lengkapi Semua Data`, false)
            throw 'lengkapi semua data'
          }
          this.listUjianBaru.splice(0,1)
        }
        this.displayAddUjian = false
        this.refreshUjian(`berhasil menambahkan ujian`, true)
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
            // console.log(this.listEditUjian[i])
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
        this.listUjian = (await axios.get("guru/listUjianGuru")).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        //clone list ujian
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
        console.log('jalan 3')
        this.displayMessage = false
        this.message = `terjadi error`
      }, 3000)
    }
  }
}
</script>