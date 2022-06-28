<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
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
          <th scope="col">Batch</th>
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
          <td v-else>{{value.time}}</td>
          <!--date-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td v-else>{{new Date(value.date).toLocaleString()}}</td>
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
            <th scope="col"></th>
            <th scope="col">Name Batch</th>
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
            <td class="position-relative w-25">
              <select v-model="listUjianBaru[key].nameBatch" class="form-select form-select-sm" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value=""></option>
                <option v-for="(value1, key1) in listBatch">{{value1.name}}</option>
              </select>
              <!--<input v-model="listUjianBaru[key].nameBatch" @keyup="addUjianBatch" @focus="value.modeAddBatch=true" @blur="value.modeAddBatch=false" class="form-control form-control-sm" style="z-index:2" type="text">
              <div class="list-group position-absolute" :class="{'d-none':!value.modeAddBatch, 'd-block':value.modeAddBatch}" style="z-index:3">
                <span v-for="(value1, key1) in listBatch">
                  <span v-if="!listUjianBaru[key].nameBatch || value1.name.toLowerCase().includes(listUjianBaru[key].nameBatch.toLowerCase())" @click="listUjianBaru[key].nameBatch = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</span>
                </span>
              </div>-->
            </td>
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
    modeAddBatch: false,
    editMode: false,
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;
      //get list ujian
      this.listUjian = (await axios.get("guru/listUjianGuru", {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      console.log(this.listUjian)
      //get list edit ujian
      this.listEditUjian = (await axios.get("guru/listUjianGuru", {})).data.data
      if(this.listEditUjian.length == 0) this.listEditUjian = false
      console.log(this.listEditUjian)
      //get list batch
      this.listBatch = (await axios.get("guru/listBatch", {})).data.data
      if(this.listBatch.length == 0) this.listBatch = false
      console.log(this.listBatch)

      // console.log(new Date())
      // console.log(new Date().valueOf())
      // console.log(new Date().valueOf() + 1000*60*60*24)
      // console.log(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))
      // console.log(parseInt(new Date()) + 1000*60*60*24)
      // console.log(new Date().toISOString().substring(0, 16))
      // console.log(new Date().toLocaleString().replace('/','-').replace(' ','T').replace('.',':'))
      
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async klick(e){
      try{
        console.log(e)
        console.log("klick")
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async addUjianBatch(){
      try{
        console.log(this.token.token)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddUjian(){
      try{
        // let addUjian = {tugasName:[], tugasDescription:[]}
        let id = null
        for(let i = 0; i < this.listUjianBaru.length; i++){
          if(this.listUjianBaru[i].nameBatch && this.listUjianBaru[i].name && this.listUjianBaru[i].pengawas){
            let addUjian = {}
            id = null
            for(let o = 0; o < this.listBatch.length; o++){
              if(this.listUjianBaru[i].nameBatch == this.listBatch[o].name){
               id = this.listBatch[o].id
              }
            }
            if(!id) continue
            addUjian.name = this.listUjianBaru[i].name || null
            addUjian.pengawas = this.listUjianBaru[i].pengawas || null
            addUjian.time = this.listUjianBaru[i].time || null
            addUjian.date = this.listUjianBaru[i].date || null
            console.log(addUjian)
            console.log(await axios.post("guru/addUjian/"+id, addUjian))
          }
        }
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjianGuru", {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        console.log(this.listUjian)
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjianGuru", {})).data.data
        if(this.listEditUjian.length == 0) this.listEditUjian = false
        console.log(this.listEditUjian)
        this.displayAddUjian = false
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
        this.listUjian = (await axios.get("guru/listUjianGuru", {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        console.log(this.listUjian)
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjianGuru", {})).data.data
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
        this.listUjian = (await axios.get("guru/listUjianGuru", {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        console.log(this.listUjian)
        //get list edit ujian
        this.listEditUjian = (await axios.get("guru/listUjianGuru", {})).data.data
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