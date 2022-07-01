<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <!--ujian-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Pertemuan</h3>
      <div class="d-flex align-items-center">
      </div>
    </div>
    
    <!--loading-->
    <div v-if="listPertemuan.length == 0" class="text-center p-3">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="!listPertemuan" class="text-center p-3">Data Tidak Tersedia</div>

    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div v-for="(value, key) in listPertemuan" class="accordion-item">
        <h2 class="accordion-header" v-bind:id="'panelsStayOpen-'+numberToText.convertToText(key+1).replace(' ','')">
          <div class="accordion-button collapsed text-dark bg-opacity-10" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#panelsStayOpen-collapse'+numberToText.convertToText(key+1).replace(' ','')" aria-expanded="false" v-bind:aria-controls="'#panelsStayOpen-collapse'+numberToText.convertToText(key+1).replace(' ','')"
            :class="{
              'bg-light':value.status=='akan datang',
              'bg-success':value.status=='hadir',
              'bg-danger':value.status=='tidak hadir',
            }" 
          >
            <div class="col d-flex flex-column position-static">
              <div class="mb-1 text-muted">{{(new Date(value.date)).toDateString()}}</div>
              <p class="card-text mb-auto">{{value.name}} - {{value.ket}}</p>
            </div>
          </div>
        </h2>
        <div v-if="new Date(value.date) <= new Date()" v-bind:id="'panelsStayOpen-collapse'+numberToText.convertToText(key+1).replace(' ','')" class="accordion-collapse collapse" v-bind:aria-labelledby="'panelsStayOpen-heading'+numberToText.convertToText(key+1).replace(' ','')">
          <div class="accordion-body">
            <div class="d-flex">
              <div class="" style="width:48%; margin:1%">
                <div class="shadow-sm p-1 mb-2 bg-body rounded">
                  <h5 class="navbar-brand text-warning text-center">Tugas</h5>
                </div>
                <div class="list-group" syle="" v-for="(valueTugas, keyTugas) in value.tugas">
                  <p style="margin:0px" class="list-group-item list-group-item-action list-group-item-warning d-flex justify-content-between">
                    {{valueTugas.name}}
                    <button class="btn btn-sm btn-light" type="button" @click="displayAddTugas(valueTugas.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                        <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                      </svg>
                    </button>
                  </p>
                  <p v-for="(valueTugasSubmit, keyTugasSubmit) in listSubmitTugas[valueTugas.id]" style="margin:0px" class="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between">
                    <p style="margin:0px">{{valueTugasSubmit.submit_link}}</p>
                    <p style="margin:0px">{{valueTugasSubmit.score || '-'}}</p>
                  </p>
                </div>
              </div>
              <div class="" style="width:48%; margin:1%">
                <div class="shadow-sm p-1 mb-2 bg-body rounded">
                  <h5 class="navbar-brand text-warning text-center">Materi</h5>
                </div>
                <div class="card mb-1" style="max-width: 50vw;" v-for="(valueMateri, keyMateri) in value.file">
                  <div class="d-flex">
                    <div class="w-25" v-if="/jpg|png|jpeg/i.test(/[^\.]+$/i.exec(valueMateri.file)[0])">
                      <img v-bind:src="'http://localhost:5000/upload/'+valueMateri.file" class="img-fluid rounded-start" v-bind:alt="valueMateri.file.replace(/^\d*-/i, '')">
                    </div>
                    <div class="w-100 d-flex">
                      <div class="card-body p-2">
                        <h6 style="margin:0px" class="card-title">{{valueMateri.file.replace(/^\d*-/i, '')}}</h6>
                        <p class="card-text">{{valueMateri.ket}}</p>
                      </div>
                      <button class="btn btn-sm btn-light" type="button" @click="downloadFile(valueMateri.file)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>


<!--modal add Tugas / file pertemuan-->
<div :class="{'d-block':displayAddTugasP, 'd-none':!displayAddTugasP}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddTugasP = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Tugas Submit</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddTugas()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listTugasBaru[displayAddTugasP].push({link:''})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddTugasP = false">x</button>
        </div>
      </div>
    </div>
    <table class="table">
        <thead>
          <tr>
            <th style="width:5%" scope="col"></th>
            <th style="" scope="col">Link</th>
            <th style="width:5%" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listTugasBaru[displayAddTugasP]">
            <td class="text-center">{{key+1}}</td>
            <td><input v-model="listTugasBaru[displayAddTugasP][key].link" class="form-control form-control-sm" type="text"></td>
            <td class="text-center" @click="listTugasBaru[displayAddTugasP].splice(key, 1)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
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
import numberToText from "number-to-text/converters/en-us";
// import from ('number-to-text/converters/en-us')
export default {
  data: () => ({
    //absen
    listPertemuan:[],
    //tugas
    listTugasBaru: {},
    displayAddTugasP:false,
    //submit tugas
    listSubmitTugas: {},
    //file
    viewFile: {},
    //message
    displayMessage: false
  }),
  async mounted() {
    try{
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(recaptchaScript)
      axios.defaults.headers.common['token'] = await this.$store.getters["auth/token"]
      //list anggota batch
      this.listPertemuan = (await axios.get("murid/dataAbsenMateri/", {})).data.data
      if(this.listPertemuan.length == 0) this.listPertemuan = false

      //perulangan list pertemuan
      for(let i = 0; i < this.listPertemuan.length; i++){
        if(new Date(this.listPertemuan[i].date) <= new Date()){ //pertemuan sudah dimulai
          if(this.listPertemuan[i].id_murid){ //tidak hadir dalam pertemuan
            this.listPertemuan[i].status = "hadir"
          }else{ //tidak hadir dalam pertemuan
            this.listPertemuan[i].status = "tidak hadir"
          }
          // console.log(this.listPertemuan[i].tugas)
          if(this.listPertemuan[i].tugas.length){
            for(let o = 0; o < this.listPertemuan[i].tugas.length; o++){
              //list submit tugas
              // console.log(this.listPertemuan[i].tugas[o])
              if(this.listPertemuan[i].tugas[o].id) {
                console.log(this.listPertemuan[i].tugas[o].id)
                this.listSubmitTugas[this.listPertemuan[i].tugas[o].id] = (await axios.get("murid/listTugasSubmit/"+[this.listPertemuan[i].tugas[o].id])).data.data
              }
            }
          }
        }else{//pertemuan belum mulai
          this.listPertemuan[i].status = "akan datang"
        }
      }
      console.log(this.listPertemuan)
      console.log(this.listSubmitTugas)
      console.log(numberToText.convertToText(25).replace(' ',''))
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    //tugas
    async displayAddTugas(id){
      try{
        this.displayAddTugasP = id
        this.listTugasBaru[id] ? true : this.listTugasBaru[id] = [{link: ''}]
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddTugas(){
      try{
        // let addTugas = [] 
        let id = this.displayAddTugasP
        for(let i = 0; this.listTugasBaru[id].length; i){
          if(this.listTugasBaru[id][i].link){
            // addTugas.push(this.listTugasBaru[id][i].link)
            //kirim backend
            await axios.post("murid/addTugas/"+id, {link:this.listTugasBaru[id][i].link})
          }
          this.listTugasBaru[id].splice(0,1)
        }
        //refresh
        this.refreshTugas(`berhasil mengirim tugas submit`, true)
      }catch(err){
        this.messageF(`gagal mengirim tugas submit`, false)
        console.log("error")
        console.log(err)
      }
    },
    async refreshTugas(ket, status){
      try{
        //list anggota batch
        this.listSubmitTugas[this.displayAddTugasP] = (await axios.get("murid/listTugasSubmit/"+[this.displayAddTugasP])).data.data
        if(this.listSubmitTugas.length == 0) this.listSubmitTugas = false
        //nonaktifkan display add materi
        this.displayAddTugasP = false
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh materi`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    //download File
    async downloadFile(file){
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
        }).catch((err)=>{
          console.log('data tidak ada')
          this.messageF(`file ${file} tidak ditemukan`, false)
        })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    viewFileF(file){
      console.log("asdsad")
      this.viewFile[file] = true
      console.log(file)
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