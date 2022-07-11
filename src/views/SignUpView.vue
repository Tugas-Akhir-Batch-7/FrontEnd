<template>
<main class="container p-5 form-signin w-100 m-auto">
  <form>
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
      <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
      <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
    </svg>
    <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
    <div :style="{display:this.step[0]}">
      <img src="https://via.placeholder.com/300" class="rounded mx-auto d-block" alt="image">
      <div class="m-2">
        <label for="inputImage" class="form-label">Upload an image as Your Profile Picture</label>
        <input type="file" class="form-control" id="inputImage" name="profile">
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="text"
          name="name"
          id="text"
          placeholder="Your Name"
          v-model="name"
        />
        <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="email"
          name="email"
          id="text"
          placeholder="Your E-mail"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="password"
          name="password"
          id="text"
          placeholder="Password"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="password"
          name="passwordConfirm"
          id="text"
          placeholder="Password Confirm"
          v-model="password"
        />
        <label for="floatingPassword">Password Confirm</label>
      </div>
      <div class="m-2">
        <label for="inputState" class="form-label">Status</label>
        <select id="inputState" class="form-select" v-model="role" @click="klickRole">
          <option>murid</option>
          <option>guru</option>
          <option>admin</option>
        </select>
      </div>
      <div class="form-floating m-2" :style="{display:this.userAdmin}">
        <input
          class="form-control"
          type="text"
          name="usernameAdmin"
          id="text"
          placeholder="Username Admin"
          v-model="email"
        />
        <label for="floatingInput">Username Admin</label>
      </div>
    </div>
    <div :style="{display:this.step[1]}">
      <img src="https://via.placeholder.com/300" class="rounded mx-auto d-block" alt="image">
      <div class="m-2">
        <label for="inputImage" class="form-label">Upload an image of Your ID card</label>
        <input type="file" class="form-control" id="inputImage" name="ktp">
      </div>
      <div class="form-floating m-2">      
        <input
          class="form-control"
          type="text"
          name="birtday"
          id="text"
          placeholder="Your Birtday"
          v-model="birtday"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
        />
        <label for="floatingInput">Birtday</label>
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="text"
          name="address"
          id="text"
          placeholder="Your Address"
          v-model="address"
        />
        <label for="floatingInput">Address</label>
      </div>
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="text"
          name="contact"
          id="text"
          placeholder="Your Contact"
          v-model="contact"
        />
        <label for="floatingInput">Contact</label>
      </div>
    </div>
    <div :style="{display:this.step[2]}">
      <div class="form-floating m-2">
        <input
          class="form-control"
          type="text"
          name="otp"
          id="text"
          placeholder="Your otp"
          v-model="otp"
        />
        <label for="floatingInput">otp</label>
      </div>
    </div>
    <button class="w-50 btn btn-lg btn-secondary" type="button" @click="previous">{{vprevious}}</button>
    <button class="w-50 btn btn-lg btn-secondary" type="button" @click="next">{{vnext}}</button>
  </form>
</main>
  <main>
    <SignUpVue />
  </main>
</template>

<script>
export default {
  data: () => ({
    position:1,
    step:['block','none','none'],
    vnext:'next',
    vprevious:'previous',
    ketPrevious: '', 
    role:'murid',
    selected:'',
    userAdmin: 'none',
  }),
  methods: {
    next(){
      console.log(this.step)
      for(let i = 0; i < this.step.length; i++){
        console.log(i)
        if(this.step[i] == 'block'){
          if(i+2 == this.step.length){
            this.step[i] = 'none'
            this.step[i+1] = 'block'
            this.vnext = 'Sign Up'
            break
          }else if(i == this.step.length-1){
            break
          }else{
            this.step[i] = 'none'
            this.step[i+1] = 'block'
            break
          }
        }
      }
      this.vprevious = 'previous'
      console.log(this.step)
    },previous(){
      console.log(this.step)
      for(let i = this.step.length-1; i >= 0; i--){
        console.log(i)
        if(this.step[i] == 'block'){
          if(i-1 == 0){
            this.step[i] = 'none'
            this.step[i-1] = 'block'
            this.ketPrevious = 'disabled data-bs-toggle="button"'
            break
          }else if(i == 0){
            break
          }else{
            this.step[i] = 'none'
            this.step[i-1] = 'block'
            break
          }
        }
      }
      this.vnext = 'next'
    }, klickRole(){
      console.log(this.userAdmin)
      console.log(this.role)
      this.role == 'guru' ? this.userAdmin = 'block' : this.userAdmin = 'none'
      console.log(this.userAdmin)
    }
  }
}
</script>