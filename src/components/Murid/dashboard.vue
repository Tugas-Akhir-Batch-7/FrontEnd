<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--ujian-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Ujian</h3>
    </div>
    <table class="table table-hover text-center align-middle" style="margin-bottom:2em">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name Ujian</th>
          <th scope="col">Pengawas</th>
          <th scope="col">Date</th>
          <th scope="col">TIme</th>
          <th scope="col">Score</th>
          <th scope="col">Peringkat</th>
          <th scope="col">Submit Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listUjian.length == 0" v-for="i in jumlah">
          <!--<td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>-->
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
          <td style="padding:8px; border: 10px solid white; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">-</td>
        </tr>
        <tr v-if="!listUjian">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-if="listUjian.length" v-for="(value, key) in jumlah">
          <td v-if="listUjian[keyPage() + key]" style="width:5%; text-align:center">{{keyPage() + key+1}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].name}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].pengawas}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].date1}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].time.substring(0, 5)}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].score || '-'}}</td>
          <td v-if="listUjian[keyPage() + key]">{{listUjian[keyPage() + key].rangking == '0' ? '-':listUjian[keyPage() + key].rangking}}</td>
          <td v-if="listUjian[keyPage() + key]">
            <!-- add / edit ujian submit-->
            <div style="margin:0px">
              <div class="d-flex" v-if="listUjian[keyPage() + key].editMode && editUjian(listUjian[keyPage() + key].time, listUjian[keyPage() + key].date)" style="margin:0px">
                <input class="form-control form-control-sm" type="text" v-model="listUjian[keyPage() + key].submit_link">
                <button type="button" class="btn-sm btn btn-outline-warning" style="margin-left:1em;" @click="updateSubmitTugas(keyPage() +key)">
                  save
                </button>
              </div>
              <div class="d-flex" v-else style="margin:0px">
                <div class="w-100"> {{listUjian[keyPage() + key].submit_link}}</div>
                <button v-if="editUjian(listUjian[keyPage() + key].time, listUjian[keyPage() + key].date)" type="button" class="btn-sm btn btn-outline-warning" style="margin-left:1em;" @click="listUjian[keyPage() +key].editMode = true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </button>
              </div>
            </div>
          </td>
          <!--new Date(((new Date(listUjian[keyPage() + key].date)).getTime()) + (Number(listUjian[keyPage() + key].time.split(':')[0]) * 60 * 60 * 1000 + Number(listUjian[keyPage() + key].time.split(':')[1]) * 60 * 1000 + Number(listUjian[keyPage() + key].time.split(':')[2]) * 1000))-->
        </tr>
      </tbody>
    </table>
    <!-- navigasi page -->
    <nav aria-label="Page navigation example" style="margin-top:2%" v-if="listUjian.length > 0">
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
        <li class="page-item" v-if="(page+1)*jumlah.length < listUjian.length">
          <button class="page-link text-warning" @click="navigation('next')">{{page+1}}</button>
          </li>
        <li class="" v-if="(page+1)*jumlah.length < listUjian.length"><button class="page-link" style="">. . .</button></li>
        <li class="page-item" v-if="page*jumlah.length < listUjian.length">
          <button class="page-link text-warning" @click="navigation('last')">{{
            listUjian.length % jumlah.length == 0 ? 
              (listUjian.length / jumlah.length)  : 
              ((listUjian.length - (listUjian.length % jumlah.length)) / jumlah.length) + 1
          }}</button>
        </li>
        <!--<li class="page-item" :class="{'disabled': page*jumlah >= listPertemuan.length}">
          <button class="page-link" @click="navigation('next')">></button>
        </li>-->
      </ul>
    </nav>
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
import FormData from "form-data";
import moment from 'moment';
moment().format();
export default {
  data: () => ({
    //absen
    listUjian:[],
    page:1,
    jumlah:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    editMode: false,
    //message
    displayMessage: false
  }),
  async mounted() {
    try{
      axios.defaults.headers.common['token'] = await this.$store.getters["auth/token"]
      //list anggota batch
      this.listUjian = (await axios.get("murid/dataUjian/", {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      for(let i = 0; i < this.listUjian.length; i++){
        this.listUjian[i].date1 = moment(this.listUjian[i].date).format('dddd, DD MMMM YYYY, HH:mm')
      }
    }catch(err){
      console.log("error")
      console.log(err)
    }
  },
  methods:{
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
          this.page =  this.listUjian.length % this.jumlah.length == 0 ? 
            (this.listUjian.length / this.jumlah.length)  : 
            ((this.listUjian.length - (this.listUjian.length % this.jumlah.length)) / this.jumlah.length) + 1
          break
        case '':
          break
      }
    },
    async updateSubmitTugas(i){
      try{
        //kirim data
        let res = (await axios.post("murid/updateUjian/"+this.listUjian[i].id, 
          {link:this.listUjian[i].submit_link})).data.data
        //edit mode off
        this.listUjian[i].editMode = false
        // //perbarui clone
        //ket
        this.messageF(`berhasil menupdate link submit `+this.listUjian[i].submit_link, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    editUjian(time, date){
      try{
        let datetime = new Date(((new Date(date)).getTime()) + (
          Number(time.split(':')[0]) * 60 * 60 * 1000 + 
          Number(time.split(':')[1]) * 60 * 1000 + 
          Number(time.split(':')[2]) * 1000
        ))
        return datetime >= new Date()
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