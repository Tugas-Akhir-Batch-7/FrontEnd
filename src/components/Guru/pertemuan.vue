<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--pertemuan-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Pertemuan</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddPertemuan = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button> 
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshPertemuan()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveEditPertemuan()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="text-center" scope="col">Name Batch</th>
          <th class="text-center" scope="col">Name Pertemuan</th>
          <th class="text-center" scope="col">Pengajar</th>
          <th class="text-center" scope="col">Keterangan</th>
          <th class="text-center" scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listPertemuan.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listPertemuan">
          <td colspan="15" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listPertemuan" @click="detailPertemuan(value.id_pertemuan)" :class="{
          'table-light':value.name_guru == username && new Date(value.date) <= new Date(),
          'table-warning':value.name_guru == username && new Date(value.date) > new Date(),
          'table-danger':editMode && listDeletePertemuan.includes(value.id_pertemuan)
        }">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--name batch-->
          <td v-if="editMode && listEditPertemuan[key] && new Date(value.date) > new Date() && listBatchA.includes(listEditPertemuan[key].name_batch)">
            <input v-model="listEditPertemuan[key].name_batch" @focus="value.modeEditBatch=true" @blur="modeHover(key, 'edit', 'batch')" class="form-control form-control-sm" style="z-index:2" type="text">
            <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeEditBatch, 'd-block':value.modeEditBatch}" style="z-index:3 height:100px">
              <div  style="height:30vh; width:12vw">
                <div v-for="(value1, key1) in listBatch">
                  <div v-if="!listEditPertemuan[key].name_batch || value1.name.toLowerCase().includes(listEditPertemuan[key].name_batch.toLowerCase())" @click="listEditPertemuan[key].name_batch = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                </div>
              </div>
            </div>
          </td>
          <td v-else>{{value.name_batch}}</td>
          <!--name pertemuan-->
          <td v-if="editMode && listEditPertemuan[key] && new Date(value.date) > new Date()"><input v-model="listEditPertemuan[key].name_pertemuan" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.name_pertemuan}}</td>
          <!--name guru-->
          <td v-if="editMode && listEditPertemuan[key] && new Date(value.date) > new Date() && listBatchA.includes(listEditPertemuan[key].name_batch)">
            <input v-model="listEditPertemuan[key].name_guru" @focus="value.modeEditGuru=true" @blur="modeHover(key, 'edit', 'guru')" class="form-control form-control-sm" style="z-index:2" type="text">
            <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeEditGuru, 'd-block':value.modeEditGuru}" style="z-index:3 height:100px">
              <div  style="height:30vh; width:12vw">
                <div v-for="(value1, key1) in listGuru">
                  <div v-if="!listEditPertemuan[key].name_guru || value1.name.toLowerCase().includes(listEditPertemuan[key].name_guru.toLowerCase())" @click="listEditPertemuan[key].name_guru = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                </div>
              </div>
            </div>
          </td>
          <td v-else>{{value.name_guru}}</td>
          <!--keterangan-->
          <td v-if="editMode && listEditPertemuan[key] && new Date(value.date) > new Date()"><input v-model="listEditPertemuan[key].keterangan" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.keterangan}}</td>
          <!--date-->
          <td v-if="editMode && listEditPertemuan[key] && new Date(value.date) > new Date()"><input v-model="listEditPertemuan[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td v-else>{{new Date(value.date).toUTCString().substring(0, 25)}}</td>
          <!--delete-->
          <td style="width:5%;text-align:center" v-if="editMode && !listDeletePertemuan.includes(value.id_pertemuan)" @click="listDeletePertemuan.push(value.id_pertemuan)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editMode && listDeletePertemuan.includes(value.id_pertemuan)" @click="listDeletePertemuan.splice(listDeletePertemuan.indexOf(value.id_pertemuan))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
    
<!--modal add Pertemuan-->
<div :class="{'d-block':displayAddPertemuan, 'd-none':!displayAddPertemuan}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddPertemuan = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Pertemuan</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddPertemuan()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listPertemuanBaru.push({name:'',pay:1000000,date:(new Date().toISOString().substring(0, 10))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddPertemuan = false">x</button>
        </div>
      </div>
    </div>
    <table class="table ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th class="text-center" style="width:19%;" scope="col">Batch</th>
            <th class="text-center" style="width:19%;" scope="col">Name Pertemuan</th>
            <th class="text-center" style="width:18%;" scope="col">Pengajar</th>
            <th class="text-center" style="width:25%;" scope="col">Keterangan</th>
            <th class="text-center" style="width:19%;" scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listPertemuanBaru">
            <td style="width:5%; text-align:center">{{key+1}}</td>
            <!--name batch-->
            <td>
              <input v-model="listPertemuanBaru[key].name_batch" @focus="value.modeAddBatch=true" @blur="modeHover(key, 'add', 'batch')" class="form-control form-control-sm" style="z-index:2" type="text">
              <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeAddBatch, 'd-block':value.modeAddBatch}" style="z-index:3 height:100px">
                <div  style="height:30vh; width:12vw">
                  <div v-for="(value1, key1) in listBatch">
                    <div v-if="!listPertemuanBaru[key].name_batch || value1.name.toLowerCase().includes(listPertemuanBaru[key].name_batch.toLowerCase())" @click="listPertemuanBaru[key].name_batch = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                  </div>
                </div>
              </div>
            </td>
            <!--name pertemuan-->
            <td><input v-model="listPertemuanBaru[key].name_pertemuan" class="form-control form-control-sm" type="text"></td>
            <td>
              <input v-model="listPertemuanBaru[key].name_guru" @focus="value.modeAddGuru=true" @blur="modeHover(key, 'add', 'guru')" class="form-control form-control-sm" style="z-index:2" type="text">
              <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeAddGuru, 'd-block':value.modeAddGuru}" style="z-index:3 height:100px">
                <div  style="height:30vh; width:12vw">
                  <div v-for="(value1, key1) in listGuru">
                    <div v-if="!listPertemuanBaru[key].name_guru || value1.name.toLowerCase().includes(listPertemuanBaru[key].name_guru.toLowerCase())" @click="listPertemuanBaru[key].name_guru = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                  </div>
                </div>
              </div>
            </td>
            <!--keterangan-->
            <td><input v-model="listPertemuanBaru[key].keterangan" class="form-control form-control-sm" type="text"></td>
            <!--date-->
            <td><input v-model="listPertemuanBaru[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
            <!--<td><button type="button" class="btn btn-sm btn-outline-primary">v</button></td>-->
            <td @click="listPertemuanBaru.splice(key, 1)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
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
import qs from 'qs';
export default {
  data: () => ({
    //guru
    nameGuru: '',
    listGuru: [],
    modeAddGuru: false,
    //batch
    listBatch: [],
    listBatchA: [],
    modeAddBatch: false,
    //pertemuan
    listPertemuan:[],
    listEditPertemuan:[],
    listDeletePertemuan:[],
    listPertemuanBaru:[
      {name_batch: "asd", name_pertemuan:"", name_guru:"", keterangan:"", datetime:""},
      {name_batch: "", name_pertemuan:"asd", name_guru:"", keterangan:"", datetime:""},
      {name_batch: "", name_pertemuan:"", name_guru:"asd", keterangan:"", datetime:""},
      {name_batch: "", name_pertemuan:"", name_guru:"", keterangan:"asd", datetime:"2023-06-20T07:24"},
      {name_batch: "Fullstack Javascript Batch 1", name_pertemuan:"zxc", name_guru:"Guru Rajin 1", keterangan:"zxc", datetime:"2023-06-20T07:24"},
      {name_batch: "Fullstack Javascript Batch 1", name_pertemuan:"mnb", name_guru:"Guru Rajin 3", keterangan:"zxc", datetime:"2021-06-20T07:24"},
    ],
    editMode: false,
    displayAddPertemuan: false,
    //message
    message: 'terjadi error',
    messageStatus: true,
    displayMessage: false,
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      this.username = await this.$store.getters["auth/user"].name
      //ambil list batch
      axios.defaults.headers.common['token'] = this.token;
      //list pertemuan
      this.listPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
      if(this.listPertemuan.length == 0) this.listPertemuan = false
      //list edit pertemuan 
      this.listEditPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
      if(this.listEditPertemuan.length == 0) this.listEditPertemuan = false
      //get list batch
      this.listBatch = (await axios.get("guru/listBatch", {})).data.data
      if(this.listBatch.length == 0) this.listBatch = false
      this.listBatch.forEach((el)=>{
        this.listBatchA.push(el.name)
      })
      //get list guru
      this.listGuru = (await axios.get("guru/listGuru", {})).data.data
      if(this.listGuru.length == 0) this.listGuru = false
      //name guru
      this.nameGuru = await this.$store.getters["auth/user"].name

      // console.log(this.listPertemuan)
      // console.log(this.listBatch)
      // console.log(this.listBatchA)
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async saveAddPertemuan(){
      try{
        console.log(this.listBatch)
        console.log(this.listPertemuanBaru) 
        let idBatch = null
        let idGuru = null
        for(let i = 0; this.listPertemuanBaru.length; i){
          if(this.listPertemuanBaru[i].name_batch && this.listPertemuanBaru[i].name_guru){
            let addPertemuan = {}
            //batch
            idBatch = null
            for(let o = 0; o < this.listBatch.length; o++){
              if(this.listPertemuanBaru[i].name_batch == this.listBatch[o].name){
               idBatch = this.listBatch[o].id
              }
            }
            console.log(idBatch) 
            if(!idBatch) { //jika nama batch yang diinputkan tidak tersedia di nama batch
              this.messageF(`batch ${this.listPertemuanBaru[i].name_batch} tidak tersedia / tidak memiliki hak akses`, false)
              throw `batch ${this.listPertemuanBaru[i].name_batch} tidak tersedia / tidak memiliki hak akses`
            }
            //guru
            idGuru = null
            if(!this.listPertemuanBaru[i].name_guru) this.listPertemuanBaru[i].name_guru = this.nameGuru
            for(let o = 0; o < this.listGuru.length; o++){
              if(this.listPertemuanBaru[i].name_guru == this.listGuru[o].name){
               idGuru = this.listGuru[o].id
              }
            }
            if(!idGuru) { //jika nama batch yang diinputkan tidak tersedia di nama batch
              this.messageF(`guru ${this.listPertemuanBaru[i].name_guru} tidak tersedia`, false)
              throw `guru ${this.listPertemuanBaru[i].name_guru} tidak tersedia`
            }
            addPertemuan.pengajar = idGuru || null
            addPertemuan.name = this.listPertemuanBaru[i].name_pertemuan || null
            addPertemuan.ket = this.listPertemuanBaru[i].keterangan || null
            addPertemuan.date = this.listPertemuanBaru[i].datetime || null
            await axios({
              method: 'post',
              url: "guru/addPertemuan/"+idBatch,
              data: addPertemuan,
              headers: {'Content-Type': 'multipart/form-data' }
            })
          }
          this.listPertemuanBaru.splice(0,1)
        }
        //list pertemuan
        this.listPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listPertemuan.length == 0) this.listPertemuan = false
        //list pertemuan baru
        this.listEditPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listEditPertemuan.length == 0) this.listEditPertemuan = false
        this.displayAddPertemuan = false
        this.messageF(`berhasil menambahkan pertemuan`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshPertemuan(){
      try{
        //list pertemuan
        this.listPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listPertemuan.length == 0) this.listPertemuan = false
        //list pertemuan baru
        this.listEditPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listEditPertemuan.length == 0) this.listEditPertemuan = false
        this.messageF(`reset pertemuan`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveEditPertemuan(){
      try{
        let idBatch, idGuru
        //delete tugas
        for(let i = 0; i < this.listDeletePertemuan.length; i++){
          await axios.delete("guru/deletePertemuan/"+this.listDeletePertemuan[i], {})
        }
        //edit tugas
        for(let i = 0; i < this.listEditPertemuan.length; i++){
          if(this.listEditPertemuan[i].name_batch != this.listPertemuan[i].name_batch || 
            this.listEditPertemuan[i].name_pertemuan != this.listPertemuan[i].name_pertemuan || 
            this.listEditPertemuan[i].keterangan != this.listPertemuan[i].keterangan || 
            this.listEditPertemuan[i].name_guru != this.listPertemuan[i].name_guru || 
            this.listEditPertemuan[i].datetime != this.listPertemuan[i].datetime){
            //search id batch
            if(this.listEditPertemuan[i].name_batch != this.listPertemuan[i].name_batch){
              idBatch = null
              for(let o = 0; o < this.listBatch.length; o++){
                if(this.listEditPertemuan[i].name_batch == this.listBatch[o].name) idBatch = this.listBatch[o].id
              }
              if(!idBatch) { //jika nama batch yang diinputkan tidak tersedia di nama batch
                this.messageF(`batch ${this.listEditPertemuan[i].name_batch} tidak tersedia / tidak memiliki hak akses`, false)
                throw `batch ${this.listEditPertemuan[i].name_batch} tidak tersedia / tidak memiliki hak akses`
              }
            }else idBatch = this.listPertemuan[i].id_batch
            //search id guru
            if(this.listEditPertemuan[i].name_guru != this.listPertemuan[i].name_guru){
              idGuru = null
              if(!this.listEditPertemuan[i].name_guru) this.listEditPertemuan[i].name_guru = this.nameGuru
              for(let o = 0; o < this.listGuru.length; o++){
                if(this.listEditPertemuan[i].name_guru == this.listGuru[o].name) idGuru = this.listGuru[o].id
              }
              if(!idGuru) { //jika nama batch yang diinputkan tidak tersedia di nama batch
                this.messageF(`guru ${this.listEditPertemuan[i].name_guru} tidak tersedia`, false)
                throw `guru ${this.listEditPertemuan[i].name_guru} tidak tersedia`
              }
            }else idGuru = this.listPertemuan[i]['id guru']
            console.log(this.listEditPertemuan[i])
            console.log({
              id: this.listPertemuan[i].id_pertemuan,
              pengajar: idGuru,
              batch: idBatch,
              name: this.listEditPertemuan[i].name_pertemuan, 
              ket: this.listEditPertemuan[i].keterangan,
              date: this.listEditPertemuan[i].datetime,
            })
            await axios.put("guru/updatePertemuan/"+this.listPertemuan[i].id_pertemuan, {
              pengajar: idGuru,
              batch: idBatch,
              name: this.listEditPertemuan[i].name_pertemuan, 
              ket: this.listEditPertemuan[i].keterangan,
              date: this.listEditPertemuan[i].datetime,
            })
          }
        }
        //list pertemuan
        this.listPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listPertemuan.length == 0) this.listPertemuan = false
        //list pertemuan baru
        this.listEditPertemuan = ( await axios.get("guru/listPertemuan", {})).data.data
        if(this.listEditPertemuan.length == 0) this.listEditPertemuan = false
        this.messageF(`edit pertemuan`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async modeHover(i, position, sub){
      try{
        let time = 200
        if(position == 'add'){
          if(sub == 'batch') setTimeout(()=>{this.listPertemuanBaru[i].modeAddBatch=false}, time)
          else if(sub == 'guru') setTimeout(()=>{this.listPertemuanBaru[i].modeAddGuru=false}, time)
        }else if(position == 'edit'){
          if(sub == 'batch') setTimeout(()=>{this.listPertemuan[i].modeEditBatch=false}, time)
          else if(sub == 'guru') setTimeout(()=>{this.listPertemuan[i].modeEditGuru=false}, time)
          console.log('jalan')
        }
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async detailPertemuan(id){
      try{
        if(!this.editMode) this.$router.push({ name: 'detailPertemuan', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    messageF(text, s){
      console.log('jalan')
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