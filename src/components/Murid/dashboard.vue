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
        <tr v-for="(value, key) in listUjian">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.pengawas}}</td>
          <td>{{value.date1}}</td>
          <td>{{value.time.substring(0, 5)}}</td>
          <td>{{value.score || '-'}}</td>
          <td>{{value.rangking == '0' ? '-':value.rangking}}</td>
          <td>
            <div style="margin:0px">
              <div class="d-flex" v-if="value.editMode && editUjian(value.time, value.date)" style="margin:0px">
                <input class="form-control form-control-sm" type="text" v-model="value.submit_link">
                <button type="button" class="btn-sm btn btn-outline-warning" style="margin-left:1em;" @click="updateSubmitTugas(key)">
                  save
                </button>
              </div>
              <div class="d-flex" v-else style="margin:0px">
                <div class="w-100"> {{value.submit_link}}</div>
                <button v-if="editUjian(value.time, value.date)" type="button" class="btn-sm btn btn-outline-warning" style="margin-left:1em;" @click="listUjian[key].editMode = true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </button>
              </div>
            </div>
          </td>
          <!--new Date(((new Date(value.date)).getTime()) + (Number(value.time.split(':')[0]) * 60 * 60 * 1000 + Number(value.time.split(':')[1]) * 60 * 1000 + Number(value.time.split(':')[2]) * 1000))-->
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
import FormData from "form-data";
import moment from 'moment';
moment().format();
export default {
  data: () => ({
    //absen
    listUjian:[],
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
        console.log(res)
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