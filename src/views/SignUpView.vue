<template>
<main class="container p-5 form-signin w-100 m-auto">
  <form>
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
      <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
      <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
    </svg>
    <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
    <div v-if="position == 1">
      <img :src="urlImg" class="rounded mx-auto d-block w-25 border border-dark rounded-circle" alt="image">
      <div class="m-2">
        <label for="inputImage" class="form-label">Upload an image as Your Profile Picture</label>
        <input @change="imgChange" ref="file" class="form-control form-control-sm" name="photo" id="formFileSm" type="file" accept="image/jpeg, image/png">
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          :class="{'border-danger': !name}"
          type="text"
          name="name"
          placeholder="Your Name"
          v-model="name"
        />
        <label for="floatingInput">Name</label>
      </div>
      <p v-if="!name" class="ps-3 text-danger">lengkapi username</p>
      <div class="form-floating m-2">
        <input
          @change="validEmail"
          class="form-control"
          :class="{'border-danger': !statusEmail}"
          type="email"
          name="email"
          placeholder="Your E-mail"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <p v-if="!statusEmail" class="ps-3 text-danger">{{textEmail}}</p>
      <div class="form-floating m-2 d-flex">
        <input
          @change="validPassChange"
          class="form-control"
          :class="{'border-danger': !statusPassword}"
          v-bind:type="eyePassword ? 'text':'password'"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
        <div v-if="!eyePassword" class="input-group-text" @click="eyePassword = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
        </div>
        <div v-else class="input-group-text" @click="eyePassword = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        </div>
      </div>
      <p v-if="!statusPassword" class="ps-3 text-danger">{{textPassword}}</p>
      <div class="form-floating m-2 d-flex">
        <input
          @change="validVerifyPassChange"
          class="form-control"
          :class="{'border-danger': !statusPasswordVerify && statusPassword}"
          v-bind:type="eyePasswordVerify ? 'text':'password'"
          v-bind:readonly="!statusPassword"
          name="passwordConfirm"
          placeholder="Password Confirm"
          v-model="verifyPassword"
        />
        <label for="floatingPassword">Password Confirm</label>
        <div v-if="!eyePasswordVerify" class="input-group-text" @click="eyePasswordVerify = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
        </div>
        <div v-else class="input-group-text" @click="eyePasswordVerify = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        </div>
      </div>
      <p v-if="!statusPasswordVerify && statusPassword" class="ps-3 text-danger">{{textPasswordVerify}}</p>
      <div class="m-2">
        <label for="inputState" class="form-label">Status</label>
        <select id="inputState" class="form-select" v-model="role">
          <option>murid</option>
          <option>guru</option>
          <option>admin</option>
        </select>
      </div>
      <div v-if="role=='guru'" class="form-floating m-2">
        <input
          class="form-control"
          :class="{'border-danger': userInvit == ''}"
          type="text"
          name="usernameInvit"
          placeholder="Username Invit"
          v-model="userInvit"
        />
        <label for="floatingInput">Username Invit</label>
      </div>
      <div v-if="role=='murid'" class="m-2">
        <label for="inputState" class="form-label">Batch</label>
        <select id="inputState" class="form-select" :class="{'border-danger': !batch}" v-model="batch">
          <option v-for="b in listBatch" :value="b.id">
            {{b.name}}
          </option>
        </select>
      </div>
    </div>
    <p v-if="userInvit == '' && role == 'guru'" class="ps-3 text-danger">username Invit</p>
    <div v-if="position == 2">
      <img v-if="urlKtp" :src="urlKtp" class="rounded mx-auto d-block w-25" alt="image">
      <div class="m-2">
        <label for="inputImage" class="form-label">Upload an image of Your ID card</label>
        <input @change="imgChange" ref="file" class="form-control form-control-sm" :class="{'border-danger': !ktp}" name="ktp" id="formFileSm" type="file" accept="image/jpeg, image/png">
      </div>
      <div class="form-floating m-2">      
        <input
          @change="validBirthday"
          class="form-control"
          :class="{'border-danger': !birthday || !statusBirthday }"
          type="date"
          name="birthday"
          placeholder="Your Birthday"
          v-model="birthday"
        />
        <label for="floatingInput">Birthday</label>
      </div>
      <p v-if="!birthday || !statusBirthday" class="ps-3 text-danger">{{textBirthday}}</p>
      <div class="form-floating m-2">
        <input
          class="form-control"
          :class="{'border-danger': !address}"
          type="text"
          name="address"
          placeholder="Your Address"
          v-model="address"
        />
        <label for="floatingInput">Address</label>
      </div>
      <p v-if="!address" class="ps-3 text-danger">lengkapi address</p>
      <div class="form-floating m-2">
        <input
          class="form-control"
          :class="{'border-danger': !contact}"
          type="text"
          name="contact"
          placeholder="Your Contact"
          v-model="contact"
        />
        <label for="floatingInput">Contact</label>
      </div>
      <p v-if="!contact" class="ps-3 text-danger">lengkapi contact</p>
    </div>
    <div v-if="position == 3">
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="text"
          name="otp"
          placeholder="Your otp"
          v-model="otp"
        />
        <label for="floatingInput">otp</label>
      </div>
    </div>
    <button class="w-50 btn btn-lg btn-secondary" type="button" @click="previous" v-bind:disabled="position<=1">previous</button>
    <button class="w-50 btn btn-lg btn-secondary" type="button" @click="next" v-bind:disabled="position>3">{{position >= 3 ? 'Register' : 'next'}}</button>
  </form>
</main>
<!--modal message-->
<div v-if="displayMessage" class="min-vw-100 position-fixed top-0 text-center" style="">
  <div :class="{'alert-danger': !messageStatus, 'alert-success':messageStatus}" class="alert d-none d-lg-block">{{message}}</div>
</div>
</template>
<script>
import moment from 'moment';
import axios from "axios";
import FormData from "form-data";
import store from "@/store";
export default {
  data: () => ({
    //data
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    role:'murid',
    userInvit: '',
    birthday: '',
    address: '',
    contact: '',
    otp: '',
    photo: '',
    ktp: '',
    batch: '',

    //display
    position:1,
    //password
    statusPassword: false,
    textPassword: 'masukkan password',
    eyePassword: false,
    //password verify
    statusPasswordVerify: false,
    textPasswordVerify: 'verify password',
    eyePasswordVerify: false,
    //email
    statusEmail: false,
    textEmail: 'lengkapi email',
    //bitrhday
    statusBirthday: false,
    textBirthday: 'masukkan birthday',

    //data lanjutan
    listBatch: [],
    urlImg:'http://localhost:5000/img-profile/default.png',
    urlKtp:null,
    selected:'',
    userInvit: '',

    //message
    displayMessage:false,
  }),
  async mounted() {
    try {
      //jika register dengan google
      this.name = decodeURIComponent(this.$route.query.name || '')
      this.email = decodeURIComponent(this.$route.query.email || '')
      this.profile = decodeURIComponent(this.$route.query.picture || '')
      
      const listBatch = await axios.get("/available-batch");
      this.listBatch = listBatch.data.data;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  },
  methods: {
    async next(){
      switch(this.position){
        case 1:
          try{
            if(
              //step 1
              this.name && 
              this.email && 
              this.statusPassword && 
              this.statusPasswordVerify && 
              ((this.role == 'guru' && this.userInvit) ||  (this.role == 'murid' && this.batch) ||  (this.role == 'admin'))
              ){
              let data = {
                userInvit: this.userInvit,
                role: this.role,
                email: this.email
              }
              await axios.post("/registerOtp", data)
              if(this.role == "murid"){
                this.position++
              }else{
                this.position += 2
              }
            }else{
              this.messageF('Data Tidak Valid', false)
            }
          }catch(err){
            let res = err.response.data
            //jika role guru dengan username invit tidak ada
            if(!res.succes && res.error == 'username invit tidak ada'){
              this.messageF('User Invit Tidak Ada', false)
            }
            console.log(err)
          }
          break
        case 2:
          try{
            if(
              //step 1
              this.name && 
              this.email && 
              this.statusPassword && 
              this.statusPasswordVerify && 
              ((this.role == 'guru' && this.userInvit) ||  (this.role == 'murid' && this.batch) ||  (this.role == 'admin')) &&
              //step 2
              this.birthday && 
              this.address && 
              this.contact && 
              this.batch && 
              this.ktp
              ){
              this.position++
            }else{
              this.messageF('Data Tidak Valid', false)
            }
          }catch(err){
            console.log(err)
          }
          break
        case 3:
          try{
            if(
              //step 1
              this.name && 
              this.email && 
              this.statusPassword && 
              this.statusPasswordVerify && 
              ((this.role == 'guru' && this.userInvit) ||  (this.role == 'murid' && this.batch) ||  (this.role == 'admin')) &&
              //step 2
              (this.role !== 'murid'|| (this.birthday && this.address && this.contact && this.batch && this.ktp))
              ){
              let data = new FormData() 
              data.append('name', this.name)
              data.append('email', this.email)
              data.append('password', this.password)
              data.append('otp', this.otp)
              this.photo ? data.append('profile', this.photo):false
              data.append('role', this.role)
              if(this.role == 'guru'){ //guru
                data.append('userInvit', this.userInvit)
              }else if(this.role == 'murid'){ //murid
                data.append('ktp', this.ktp)
                data.append('birthday', this.birthday)
                data.append('address', this.address)
                data.append('contact', this.contact)
                data.append('id_batch', this.batch)
              }
              console.log(data)
              //kirim backend
              data = (await axios.post("/register", data, {headers: {'Content-Type': 'multipart/form-data'}})).data
              console.log(data)
              //simpan data ke desktop
              await this.$store.dispatch("auth/loginGoogle", data);
              //redirect halaman
              if ((data.data.role) == "murid") {
                return this.$router.push("/murid_dashboard");
              } else if (data.data.role == "guru") {
                return this.$router.push("/guru_dashboard1");
              } else if (data.data.role == "admin") {
                return this.$router.push("/admin/");
              }
            }else{
              this.messageF('Data Tidak Valid', false)
            }
          }catch(err){
            console.log(err)
          }
          break
      }
    },
    previous(){
      this.position--
    },
    validPassChange(){
      if(this.password == ''){
        this.textPassword = "masukkan password"
      }else if(this.password.length < 8){
        this.textPassword = "masukkan minimal 8 karakter"
      }else if(!(/[A-Z]/.test(this.password))){
        this.textPassword = "harus terdapat satu huruf kapital (A-Z)"
      }else if((/\s/i.test(this.password))){
        this.textPassword = "masukkan karakter selain spasi"
      }else{
        this.textPassword = false
        this.statusPassword = true
      }
      if(this.textPassword){
        this.statusPassword = false
      }
    },
    validVerifyPassChange(){
      if(this.verifyPassword == ''){
        this.textPasswordVerify = "masukkan verify password"
      }else if(this.verifyPassword !== this.password){
        this.textPasswordVerify = "password berbeda"
        this.statusPasswordVerify = false
      }else{
        this.textPasswordVerify = false
        this.statusPasswordVerify = true
      }
    },
    validEmail(){
      if(this.email == ''){
        this.textEmail = "masukkan email"
      }else if(!/.+@.+\..+/.test(this.email)){
        this.textEmail = "masukkan email sesuai format"
        this.statusEmail = false
      }else{
        this.textEmail = false
        this.statusEmail = true
      }
    },
    validBirthday(){
      if(this.birthday == ''){
        this.textBirthday = "masukkan Birthday"
      }else if(moment().diff((moment(this.birthday)), 'years', true) < 18){
        this.textBirthday = "minimal umur 18 tahun"
        this.statusBirthday = false
      }else{
        this.textBirthday = false
        this.statusBirthday = true
      }
    },
    imgChange(e) {
      const file = e.target.files[0]
      const name = e.target.name 
      const url =  URL.createObjectURL(file)
      if(name == 'photo'){
        this.urlImg = url;
        this.photo = file
      }else if(name == 'ktp'){
        this.urlKtp = url;
        this.ktp = file
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