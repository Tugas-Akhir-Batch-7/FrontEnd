<template>
  <main class="d-flex flex-nowrap">
    <sidebar />
    <div class="p-3 d-flex flex-column flex-fill">
      <!--Batch-->
      <div class="nav-tabs d-flex justify-content-between">
        <h3 class="nav-link active bg-light text-warning">Batch</h3>
        <div class="d-flex align-items-center">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddBatch = true">Add</button>
            <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button>
            <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
            <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshBatch()">Reset</button>
            <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveEditBatch()">Save</button>
          </div>
        </div>
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col"></th>
            <th v-if="!editMode" scope="col"></th>
            <th class="w-50" scope="col">Name Batch</th>
            <th class="w-25" scope="col">Start Date</th>
            <th class="w-25 text-center" scope="col">Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listBatch.length == 0" v-for="i in jumlah">
            <!--<td colspan="10">
              <div class="text-center">
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </td>-->
            <td style="padding:8px 15px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
            <td style="padding:8px 15px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
            <td style="padding:8px 15px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
            <td style="padding:8px 15px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
            <td style="padding:8px 15px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          </tr>
          <tr v-if="!listBatch">
            <td colspan="10" class="text-center">Data Tidak Tersedia</td>
          </tr>
          <tr v-for="(value, key) in jumlah" :class="{'table-danger':editMode && listDeleteBatch.includes(value.id)}" v-if="listBatch.length">
            <td v-if="listBatch[keyPage() + key]" style="width:5%; text-align:center">{{keyPage() + key+1}}</td>
            <td v-if="listBatch[keyPage() + key] && !editMode" style="width:5%; text-align:center">
              <button class="btn btn-sm btn-outline-warning" type="button" @click="infoMuridBatch(listBatch[keyPage() + key].id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </td>
            <!--name-->
            <td v-if="editMode && listBatch[keyPage() + key] && new Date(listBatch[keyPage() + key].start_date) > new Date()"><input v-model="listEditBatch[keyPage() + key].name" class="form-control form-control-sm" type="text"></td>
            <td v-else-if="listBatch[keyPage() + key]">{{listBatch[keyPage() + key].name}}</td>
            <!--date-->
            <td v-if="editMode && listBatch[keyPage() + key] && new Date(listBatch[keyPage() + key].start_date) > new Date()"><input v-model="listEditBatch[keyPage() + key].date" class="form-control form-control-sm" type="date"></td>
            <td v-else-if="listBatch[keyPage() + key]" class="">{{listBatch[keyPage() + key].dateLocal}}</td>
            <!--name-->
            <td class="w-25" v-if="editMode && listBatch[keyPage() + key] && new Date(listBatch[keyPage() + key].start_date) > new Date()"><input v-model="listEditBatch[keyPage() + key].pay" class="form-control form-control-sm text-center" type="number"></td>
            <td class="text-center w-25" v-else-if="listBatch[keyPage() + key]">{{listBatch[keyPage() + key].pay}}</td>
          <!--delete-->
          <td style="width:5%;text-align:center" v-if="editMode && listBatch[keyPage() + key] && !listDeleteBatch.includes(listBatch[keyPage() + key].id)" @click="listDeleteBatch.push(listBatch[keyPage() + key].id)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editMode && listBatch[keyPage() + key] && listDeleteBatch.includes(listBatch[keyPage() + key].id)" @click="listDeleteBatch.splice(listDeleteBatch.indexOf(listBatch[keyPage() + key].id))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" style="margin-top:2%" v-if="listBatch.length > 0">
        <ul class="pagination justify-content-center">
          <!--<li class="page-item" :class="{'disabled': page==1}">
            <button class="page-link" @click="navigation('previous')">&lt</button>
          </li>-->
          <li class="page-item" v-if="page!=1">
            <button class="page-link text-warning" @click="navigation('first')">1</button>
          </li>
          <li class="" v-if="page>2"><button class="page-link" style="">. . .</button></li>
          <li class="page-item" v-if="page>2">
            <button class="page-link text-warning" @click="navigation('previous')">{{page-1}}</button>
          </li>
          <li class="page-item active">
            <button class="page-link bg-warning border border-warning">{{page}}</button>
            </li>
          <li class="page-item" v-if="(page+1)*jumlah.length < listBatch.length">
            <button class="page-link text-warning" @click="navigation('next')">{{page+1}}</button>
            </li>
          <li class="" v-if="(page+1)*jumlah.length < listBatch.length"><button class="page-link" style="">. . .</button></li>
          <li class="page-item" v-if="page*jumlah.length < listBatch.length">
            <button class="page-link text-warning" @click="navigation('last')">{{
              listBatch.length % jumlah.length == 0 ? 
                (listBatch.length / jumlah.length)  : 
                ((listBatch.length - (listBatch.length % jumlah.length)) / jumlah.length) + 1
            }}</button>
          </li>
          <!--<li class="page-item" :class="{'disabled': page*jumlah >= listPertemuan.length}">
            <button class="page-link" @click="navigation('next')">></button>
          </li>-->
        </ul>
      </nav>
    </div>
  </main>
  
<!--modal add Batch-->
<div :class="{'d-block':displayAddBatch, 'd-none':!displayAddBatch}" class="min-vw-100 min-vh-100 position-fixed top-0" style="z-index:1000">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddBatch = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Batch</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddBatch()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listBatchBaru.push({name:'',pay:1000000,date:(new Date(new Date().valueOf() + 1000*60*60*24*28+31).toISOString().substring(0, 10))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddBatch = false">x</button>
        </div>
      </div>
    </div>
    <table class="table ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="w-50" scope="col">Name</th>
          <th class="w-25" scope="col">Start Date</th>
          <th class="w-25" scope="col">Pay</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listBatchBaru">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td><input v-model="listBatchBaru[key].name" class="form-control form-control-sm" type="text"></td>
          <td><input v-model="listBatchBaru[key].date" class="form-control form-control-sm" type="date"></td>
          <td><input v-model="listBatchBaru[key].pay" class="form-control form-control-sm" type="number"></td>
          <td style="width:5%; text-align:center" @click="listBatchBaru.splice(key, 1)">x</td>
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
import sidebar from "./sidebar.vue";
</script>
<script>
import axios from "axios";
import moment from 'moment';
moment().format();
export default {
  data: () => ({
    editMode: false,
    listBatch: [],
    listBatchC: [],
    listEditBatch: [],
    listDeleteBatch: [],
    listBatchBaru: [
      {name: "", date: (new Date(new Date().valueOf() + 1000*60*60*24*28+31).toISOString().substring(0, 10)), pay: 1000000},
    ],
    editMode: false,
    displayAddBatch: false,
    page:1,
    jumlah:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //message
    message: 'terjadi error',
    messageStatus: true,
    displayMessage: false,
  }),
  async mounted() {
    try {
      axios.defaults.headers.common["token"] = await this.$store.getters["auth/token"]
      //ambil list batch
      this.listBatch = (await axios.get("guru/listBatch", {})).data.data;
      if(this.listBatch.length == 0) this.listBatch = false
      // console.log(this.listBatch)
      for(let i = 0; i < this.listBatch.length; i++){
        this.listBatch[i].dateLocal = moment(this.listBatch[i].date).format('DD MMMM YYYY')
        this.listBatch[i].date = moment(this.listBatch[i].date).format('YYYY-MM-DD')
      }
      //clone list batch
      this.listEditBatch = JSON.parse(JSON.stringify(this.listBatch))
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
  methods: {
    //navigation
    keyPage(){
      return this.page * this.jumlah.length - this.jumlah.length
      // return 1
    },
    navigation(e){
      switch(e){
        case 'previous':
          this.page -= 1
          break
        case 'next':
          this.page += 1
          break
        case 'first':
          this.page = 1
          break
        case 'last':
          this.page =  this.listBatch.length % this.jumlah.length == 0 ? 
            (this.listBatch.length / this.jumlah.length)  : 
            ((this.listBatch.length - (this.listBatch.length % this.jumlah.length)) / this.jumlah.length) + 1
          // this.page = (this.listBatch.length - (this.listBatch.length % this.jumlah.length)) / this.jumlah.length + 1
          break
        case '':
          break
      }
    },
    async infoMuridBatch(id) {
      try {
        if(!this.editMode)this.$router.push({ name: "anggotaBatch", params: { id } });
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    },
    async refreshBatch(ket, status){
      try{
        //get list Batch
        this.listBatch = (await axios.get("guru/listBatch", {})).data.data;
        if(this.listBatch.length == 0) this.listBatch = false
        for(let i = 0; i < this.listBatch.length; i++){
          this.listBatch[i].dateLocal = moment(this.listBatch[i].date).format('DD MMMM YYYY')
          this.listBatch[i].date = moment(this.listBatch[i].date).format('YYYY-MM-DD')
        }
        this.listEditBatch = JSON.parse(JSON.stringify(this.listBatch))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`Refresh Batch`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddBatch(){
      try{
        for(let i = 0; this.listBatchBaru.length; i){
          if(new Date(this.listBatchBaru[i].date) <= new Date()){
            this.messageF(`Date Tidak Valid`, false)
            throw 'Date Tidak Valid'
          }else if(this.listBatchBaru[i].name && this.listBatchBaru[i].date && this.listBatchBaru[i].pay){
            await axios.post("guru/addBatch/", {
              name: this.listBatchBaru[i].name,
              startDate: this.listBatchBaru[i].date,
              pay: this.listBatchBaru[i].pay,
            })
          }else{
            this.messageF(`Lengkapi Semua Data`, false)
            throw 'lengkapi semua data'
          }
          this.listBatchBaru.splice(0,1)
        }
        this.displayAddBatch = false
        this.refreshBatch(`Berhasil Menambahkan Batch`, true)
        this.listBatchBaru.push({name:'',pay:1000000,date:(new Date(new Date().valueOf() + 1000*60*60*24*28+31).toISOString().substring(0, 10))})
      }catch(err){
        if(err.response.data.error.original.routine == "_bt_check_unique") this.messageF(`batch ${this.listBatchBaru[0].name} sudah ada`, false)
        console.log("error")
        console.log(err)
      }
    },
    async saveEditBatch(){
      try{
        //delete tugas
        for(let i = 0; i < this.listDeleteBatch.length; i++){
          await axios.delete("guru/deleteBatch/"+this.listDeleteBatch[i], {})
        }
        //edit tugas
        for(let i = 0; i < this.listBatch.length; i++){
          if(this.listEditBatch[i].name != this.listBatch[i].name || this.listEditBatch[i].date != this.listBatch[i].date || this.listEditBatch[i].pay != this.listBatch[i].pay){
            if(new Date(this.listEditBatch[i].date) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            await axios.put("guru/updateBatch/"+this.listBatch[i].id, {
              name: this.listEditBatch[i].name, 
              startDate: this.listEditBatch[i].date,
              pay: this.listEditBatch[i].pay
            })
          }
        }
        this.editMode = false
        this.refreshBatch(`Berhasil Mengupdate Batch`, true)
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
  },
};
</script>