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
        <tr v-if="listAbsen.length == 0">
          <td colspan="5">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listAbsen">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
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
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editModeTugas, 'd-none':editModeTugas}" @click="displayAddTugasP = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editModeTugas, 'd-none':editModeTugas}" @click="editModeTugas=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editModeTugas, 'd-none':!editModeTugas}" @click="editModeTugas=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editModeTugas, 'd-none':!editModeTugas}" @click="refreshTugas()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editModeTugas, 'd-none':!editModeTugas}" @click="saveTugas()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col" v-if="editModeTugas"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listTugas.length == 0">
          <td colspan="3">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listTugas">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listTugas" :class="{'table-danger':editModeTugas && listDeleteTugas.includes(value.id)}" @click="scoreTugas(value.id)">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--name-->
          <td  class="w-25" v-if="editModeTugas && listEditTugas[key]"><input v-model="listEditTugas[key].name" class="form-control form-control-sm" type="text"></td>
          <td class="w-25" v-else>{{value.name}}</td>
          <!--description-->
          <td v-if="editModeTugas && listEditTugas[key]"><input v-model="listEditTugas[key].description" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.description}}</td>
          <!--delete-->
          <td style="width:5%;text-align:center" v-if="editModeTugas && !listDeleteTugas.includes(value.id)" @click="listDeleteTugas.push(value.id)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editModeTugas && listDeleteTugas.includes(value.id)" @click="listDeleteTugas.splice(listDeleteTugas.indexOf(value.id))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
    
    <!--materi-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Materi</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editModeMateri, 'd-none':editModeMateri}" @click="displayAddMateriP = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editModeMateri, 'd-none':editModeMateri}" @click="editModeMateri=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editModeMateri, 'd-none':!editModeMateri}" @click="editModeMateri=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editModeMateri, 'd-none':!editModeMateri}" @click="refreshMateri()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editModeMateri, 'd-none':!editModeMateri}" @click="saveMateri()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">File</th>
          <th scope="col">Keterangan</th>
          <th scope="col" v-if="editModeMateri"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listMateri.length == 0">
          <td colspan="3">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listMateri">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listMateri" :class="{'table-danger':editModeMateri && listDeleteMateri.includes(value.id)}">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--file-->
          <td class="w-50">{{value.file.replace(/^\d*-/i, '')}}</td>
          <!--keterangan-->
          <td class="w-50">{{value.ket}}</td>
          <!--delete-->
          <td @click="downloadMateri(value.file)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </td>
          <td style="width:5%;text-align:center" v-if="editModeMateri && !listDeleteMateri.includes(value.id)" @click="listDeleteMateri.push(value.id)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editModeMateri && listDeleteMateri.includes(value.id)" @click="listDeleteMateri.splice(listDeleteMateri.indexOf(value.id))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
<!--modal add tugas-->
<div :class="{'d-block':displayAddTugasP, 'd-none':!displayAddTugasP}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddTugasP = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
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
<!--modal add materi / file pertemuan-->
<div :class="{'d-block':displayAddMateriP, 'd-none':!displayAddMateriP}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddMateriP = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Materi</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddMateri()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listMateriBaru.push({name:'',description:''})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddMateriP = false">x</button>
        </div>
      </div>
    </div>
    <table class="table">
        <thead>
          <tr>
            <th style="" scope="col"></th>
            <th style="width:45%" scope="col">File</th>
            <th style="width:55%" scope="col">Keterangan</th>
            <th style="" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listMateriBaru">
            <td class="text-center">{{key+1}}</td>
            <td><input @change="listMateriBaru[key].file = $refs.file[key].files[0]" ref="file" class="form-control form-control-sm" id="formFileSm" type="file"></td>
            <td><input v-model="listMateriBaru[key].ket" class="form-control form-control-sm" type="text"></td>
            <td class="text-center" @click="listMateriBaru.splice(key, 1)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
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
import FormData from "form-data";
export default {
  data: () => ({
    //absen
    listAbsen:[],
    listUpdate:{},
    //tugas
    listTugas:[],
    listEditTugas:[],
    listDeleteTugas:[],
    listTugasBaru:[
      {name:'', description:''},
      {name:'qwe', description:''},
      {name:'', description:'asd'},
      {name:'zxc', description:'qaz'},
    ],
    editModeTugas:false,
    displayAddTugasP:false,
    //materi / file pertemuan
    listMateri:[],
    listEditMateri:[],
    listDeleteMateri:[],
    listMateriBaru:[
      {file:'', ket:''},
      {file:'', ket:''},
      {file:'', ket:'asd'},
      {file:'', ket:'qaz'},
    ],
    editModeMateri:false,
    displayAddMateriP:false,
    //message
    displayMessage:false,
  }),
  async mounted() {
    try{
      axios.defaults.headers.common['token'] = await this.$store.getters["auth/token"]
      //list anggota batch
      this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
      if(this.listAbsen.length == 0) this.listAbsen = false
      //list tugas
      this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
      if(this.listTugas.length == 0) this.listTugas = false
      this.listEditTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
      //list materi
      this.listMateri = (await axios.get("guru/listFilePertemuan/"+this.$route.params.id, {})).data.data
      if(this.listMateri.length == 0) this.listMateri = false
      this.listEditMateri = (await axios.get("guru/listFilePertemuan/"+this.$route.params.id, {})).data.data

      console.log(this.listTugas)
      console.log(this.listMateri)
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    //absen
    async refreshAbsen(ket, status){
      try{
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
        if(this.listAbsen.length == 0) this.listAbsen = false
        this.listUpdate = {}
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh materi`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAbsen(){
      try{
        await axios.post("guru/prosesAbsensi/"+this.$route.params.id, this.listUpdate)
        this.listAbsen = (await axios.get("guru/listAbsensi/"+this.$route.params.id, {})).data.data
        if(this.listAbsen.length == 0) this.listAbsen = false
        
        //refresh
        this.refreshAbsen(`berhasil mengupdate absen`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async absensi(i){
      try{
        this.listUpdate[this.listAbsen[i].id_murid] = this.listAbsen[i].id_absen ? 'x':'y'
        this.listAbsen[i].id_absen = this.listAbsen[i].id_absen ? false : true
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },

    //tugas
    async scoreTugas(id){
      try{
        this.editModeTugas ? true : this.$router.push({ name: 'scoreTugas', params: { id } })
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
            addTugas.tugasDescription.push(this.listTugasBaru[i].description)
          }
        }
        //kirim backend
        if(addTugas.tugasName.length) addTugas = (await axios.post("guru/addTugas/"+this.$route.params.id, addTugas)).data.data
        //nonaktifkan add tugas
        this.displayAddTugasP = false
        //refresh
        this.refreshTugas(`berhasil menambahkan tugas`, true)
      }catch(err){
        this.messageF(`gagal menambahkan tugas`, false)
        console.log("error")
        console.log(err)
      }
    },
    async refreshTugas(ket, status){
      try{
        this.listTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        if(this.listTugas.length == 0) this.listTugas = false
        this.listEditTugas = (await axios.get("guru/listTugas/"+this.$route.params.id, {})).data.data
        if(this.listEditTugas.length == 0) this.listEditTugas = false
        this.listDeleteTugas = []
        
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh tugas`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveTugas(){
      try{
        //delete tugas
        for(let i = 0; i < this.listDeleteTugas.length; i++){
          await axios.delete("guru/deleteTugas/"+this.listDeleteTugas[i], {})
        }
        //edit tugas
        for(let i = 0; i < this.listEditTugas.length; i++){
          if(this.listEditTugas[i].name != this.listTugas[i].name || this.listEditTugas[i].description != this.listTugas[i].description){
            console.log(this.listEditTugas[i])
            await axios.put("guru/updateTugas/"+this.listTugas[i].id, {
              name: this.listEditTugas[i].name, description: this.listEditTugas[i].description
            })
          }
        }
        //refresh
        this.refreshTugas(`berhasil mengupdate tugas`, true)
      }catch(err){
        this.messageF(`gagal mengupdate tugas`, false)
        console.log("error")
        console.log(err)
      }
    },    

    //materi
    async saveAddMateri(){
      try{
        let addMateri = new FormData() 
        for(let i = 0; this.listMateriBaru.length; i){
          if(this.listMateriBaru[i].file){
            addMateri.append('file', this.listMateriBaru[i].file)
            addMateri.append('ketFile', this.listMateriBaru[i].ket || ' ')
          }
          this.listMateriBaru.splice(0,1)
        }
        //kirim backend
        await axios.post( "guru/addFilePertemuan/"+this.$route.params.id, addMateri, {headers: {'Content-Type': 'multipart/form-data'}})
        //nonaktifkan display add materi
        this.displayAddMateriP = false
        //refresh
        this.refreshMateri(`berhasil menambahkan materi`, true)
      }catch(err){
        this.messageF(`gagal menambahkan materi`, false)
        console.log("error")
        console.log(err)
      }
    },
    async saveMateri(){
      try{
        //delete tugas
        for(let i = 0; i < this.listDeleteMateri.length; i++){
          await axios.delete("guru/deleteFilePertemuan/"+this.listDeleteMateri[i], {})
        }
        //refresh
        this.refreshMateri(`berhasil menghapus materi`, true)
      }catch(err){
        this.messageF(`gagal menghapus materi`, false)
        console.log("error")
        console.log(err)
      }
    },
    async refreshMateri(ket, status){
      try{
        //list materi
        this.listMateri = (await axios.get("guru/listFilePertemuan/"+this.$route.params.id, {})).data.data
        if(this.listMateri.length == 0) this.listMateri = false
        this.listEditMateri = (await axios.get("guru/listFilePertemuan/"+this.$route.params.id, {})).data.data
        if(this.listEditMateri.length == 0) this.listEditMateri = false
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh materi`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async downloadMateri(file){
      try{
        axios({ 
          url: encodeURI('http://localhost:5000/upload/'+file), 
          method: 'GET', 
          responseType: 'blob', 
        }).then((response) => { 
          console.log(response)
          var fileURL = window.URL.createObjectURL(new Blob([response.data])); 
          var fileLink = document.createElement('a'); 
          fileLink.href = fileURL; 
          fileLink.setAttribute('download', file); 
          document.body.appendChild(fileLink); 
          fileLink.click(); 
        });
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