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
    <div class="accordion" v-if="listPertemuan.length == 0" v-for="i in jumlah">
      <!--<div class="spinner-border text-warning" role="status">
    <div v-if="listPertemuan.length == 0" class="accordion text-center p-3">
        <span class="visually-hidden">Loading...</span>
      </div>-->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <div class="collapsed p-3">
            <div class="col d-flex flex-column position-static">
              <div class="mb-2 " style="border-radius: 10px; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">none</div>
              <p class="card-text mb-auto" style="border-radius: 10px; background-color:rgb(240, 240, 240); color:rgb(240, 240, 240)">none</p>
            </div>
          </div>
        </h2>
      </div>
    </div>
    <div v-if="!listPertemuan" class="text-center p-3">Data Tidak Tersedia</div>

    <div class="accordion">
      <div v-if="listPertemuan.length" v-for="(value, key) in jumlah" class="accordion-item">
        <h2 v-if="listPertemuan[keyPage() + key]" class="accordion-header" v-bind:id="'panelsStayOpen-'+numberToText.convertToText(keyPage() + key+1).replace(' ','')">
          <div class="accordion-button collapsed text-dark bg-opacity-10" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#panelsStayOpen-collapse'+numberToText.convertToText(keyPage() + key+1).replace(' ','')" aria-expanded="false" v-bind:aria-controls="'#panelsStayOpen-collapse'+numberToText.convertToText(keyPage() + key+1).replace(' ','')"
            :class="{
              'bg-light':new Date(listPertemuan[keyPage() + key].date) >= new Date(),
              'bg-success':listPertemuan[keyPage() + key].absen,
              'bg-danger':listPertemuan[keyPage() + key].absen === null,
            }" 
          >
            <div class="col d-flex flex-column position-static">
              <div class="mb-1 text-muted">{{listPertemuan[keyPage() + key].date1}}</div>
              <p class="card-text mb-auto">{{listPertemuan[keyPage() + key].name}} - {{listPertemuan[keyPage() + key].ket}}</p>
            </div>
          </div>
        </h2>
        <div v-if="new Date(listPertemuan[keyPage() + key].date) <= new Date()" v-bind:id="'panelsStayOpen-collapse'+numberToText.convertToText(keyPage() + key+1).replace(' ','')" class="accordion-collapse collapse" v-bind:aria-labelledby="'panelsStayOpen-heading'+numberToText.convertToText(keyPage() + key+1).replace(' ','')">
          <div class="accordion-body">
            <div v-if="listPertemuan[keyPage() + key].tugas">
              <div class="">
                <div v-if="listPertemuan[keyPage() + key].absen === null" class="text-center" style="margin:0px 1% 2% 1%">
                  Tidak Memiliki Akses Ke Materi
                </div>
                <div v-else-if="Array.isArray(listPertemuan[keyPage() + key].file) && listPertemuan[keyPage() + key].file.length == 0" class="text-center" style="margin:0px 1% 2% 1%">
                  tidak ada Materi
                </div>
                <div class="" style="margin:0px 1% 2% 1%" v-else>
                  <div class="shadow-sm p-1 mb-2 bg-body rounded">
                    <h5 class="navbar-brand text-warning text-center">Materi</h5>
                  </div>
                  <div class="card mb-1" style="" v-for="(valueMateri, keyMateri) in listPertemuan[keyPage() + key].file">
                    <div class="d-flex">
                      <div class="w-25" v-if="/jpg|png|jpeg/i.test(/[^\.]+$/i.exec(valueMateri.file)[0])">
                        <img v-bind:src="'http://localhost:5000/upload/'+valueMateri.file" class="img-fluid rounded-start p-1" v-bind:alt="valueMateri.file.replace(/^\d*-/i, '')">
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
                <div v-if="Array.isArray(listPertemuan[keyPage() + key].tugas) && listPertemuan[keyPage() + key].tugas.length == 0" class="text-center" style="margin:0px 1% 2% 1%">
                  tidak ada tugas
                </div>
                <div class="" style="margin:0px 1% 2% 1%" v-else>
                  <div class="shadow-sm p-1 mb-2 bg-body rounded">
                    <h5 class="navbar-brand text-warning text-center">Tugas</h5>
                  </div>
                  <table class="table table-hover">
                    <thead>
                      <tr class=" text-center">
                        <th scope="col">
                          <button class="btn btn-sm btn-outline-warning" type="button" @click="refreshTugas(key)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          </button>
                        </th>
                        <th scope="col">Tugas</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col"></th>
                        <th scope="col">Submit Link</th>
                        <th scope="col">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(valueTugas, keyTugas) in listPertemuan[keyPage() + key].tugas">
                        <td style="width:3%" class="text-center">{{keyTugas+1}}</td>
                        <td style="width:25%" class="">{{valueTugas.name}}</td>
                        <td style="width:41%" class="">{{valueTugas.description}}</td>
                        <td style="width:3%" class="">
                          <button v-if="valueTugas.editMode" class="btn btn-sm btn-outline-danger" type="button" @click="updateSubmitTugas(keyPage() + key, keyTugas)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            </svg>
                          </button>
                          <button v-else class="btn btn-sm btn-outline-warning" type="button" @click="valueTugas.score ? true:listPertemuan[keyPage() + key].tugas[keyTugas].editMode = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-diff" viewBox="0 0 16 16">
                              <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            </svg>
                          </button>
                        </td>
                        <td style="width:25%" class="" v-if="valueTugas.editMode"><input v-model="listPertemuan[keyPage() + key].tugas[keyTugas].submit_link" class="form-control form-control-sm" type="text"></td>
                        <td style="width:25%" class="" v-else>{{valueTugas.submit_link}}</td>
                        <td style="width:3%" class="text-center">{{valueTugas.score || '-'}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="text-center p-3">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--loading-->
    </div>
    <!-- navigasi page -->
    <nav aria-label="Page navigation example" style="margin-top:2%" v-if="listPertemuan.length > 0">
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
        <li class="page-item" v-if="(page+1)*jumlah.length < listPertemuan.length">
          <button class="page-link text-warning" @click="navigation('next')">{{page+1}}</button>
          </li>
        <li class="" v-if="(page+1)*jumlah.length < listPertemuan.length"><button class="page-link" style="">. . .</button></li>
        <li class="page-item" v-if="page*jumlah.length < listPertemuan.length">
          <button class="page-link text-warning" @click="navigation('last')">{{
            listPertemuan.length % jumlah.length == 0 ? 
              (listPertemuan.length / jumlah.length)  : 
              ((listPertemuan.length - (listPertemuan.length % jumlah.length)) / jumlah.length) + 1
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
import numberToText from "number-to-text/converters/en-us";
import moment from 'moment';
moment().format();
// import from ('number-to-text/converters/en-us')
export default {
  data: () => ({
    //pertemuan
    listPertemuan:[],
    listPertemuanC:[],
    // listPertemuanView:[],
    page:1,
    jumlah:[0, 0, 0],
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
      this.listPertemuan = (await axios.get("murid/dataPertemuan/", {})).data.data
      if(this.listPertemuan.length == 0) this.listPertemuan = false
      for(let i = 0; i < this.listPertemuan.length; i++){
        this.listPertemuan[i].date1 = moment(this.listPertemuan[i].date).format('dddd, DD MMMM YYYY, HH:mm')
      }
      //clone
      this.listPertemuanC = JSON.parse(JSON.stringify(this.listPertemuan))
      // this.listPertemuanView = JSON.parse(JSON.stringify(this.listPertemuan.slice(0, this.jumlah)))

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
          this.page =  this.listPertemuan.length % this.jumlah.length == 0 ? 
            (this.listPertemuan.length / this.jumlah.length)  : 
            ((this.listPertemuan.length - (this.listPertemuan.length % this.jumlah.length)) / this.jumlah.length) + 1
          break
        case '':
          break
      }
    },
    //tugas
    async updateSubmitTugas(idPertemuan, idTugas, ket){
      try{
        //kirim data
        let detailPertemuan = (await axios.post("murid/updateTugas/"+this.listPertemuan[idPertemuan].tugas[idTugas].id, 
          {link:this.listPertemuan[idPertemuan].tugas[idTugas].submit_link})).data.data
        //edit mode off
        this.listPertemuan[idPertemuan].tugas[idTugas].editMode = false
        //perbarui clone
        this.listPertemuanC[idPertemuan].tugas[idTugas].submit_link = this.listPertemuan[idPertemuan].tugas[idTugas].submit_link
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`berhasil menupdate link submit `+this.listPertemuan[idPertemuan].tugas[idTugas].submit_link, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshTugas(idPertemuan, ket){
      try{
        //refresh tugas
        this.listPertemuan[idPertemuan] = JSON.parse(JSON.stringify(this.listPertemuanC[idPertemuan]))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`Refresh Tugas`, true)
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