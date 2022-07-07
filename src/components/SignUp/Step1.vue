<template>
  <div class="background">
    <div class="window">
      <!-- <button @click="klick">{{count}}</button> -->

      <div id="signup_icon">
        <img src="" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form @submit.prevent style="justify-content: center">
        <div>
          <input
            required
            v-model="form.name"
            class="fields"
            type="text"
            name="username"
            id="text"
            placeholder="Your Name"
          />
        </div>

        <div>
          <input
            required
            v-model="form.email"
            class="fields"
            type="email"
            name="email"
            id="text"
            placeholder="Your E-mail"
          />
        </div>

        <div>
          <div>
            <input
              required
              v-model="form.password"
              class="fields"
              type="password"
              name="password"
              id="text"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              required
              v-model="form.confirm_password"
              class="fields"
              type="password"
              name="password.confirm"
              id="text"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div>
          <!-- <input class="fields" type="date" name="user_birthdate" id="text" placeholder="Date of Birth"> -->
          <input
            required
            v-model="form.birthdate"
            class="fields"
            id="text"
            type="text"
            placeholder="Date of Birth"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          />
        </div>

        <!-- <div>
                <input type="file" id="file1" ref="file1" @input="uploadFile()">
            </div> -->
        <div>
          <input
            style="margin: 2em auto"
            @click="next"
            class="buttons"
            type="submit"
            value="Next"
          />
        </div>
      </form>

      <!-- <button @click="cobaMoment" >Moment</button> -->

      <!-- <div><button class="buttons" id="text" @click="next">Next</button></div> -->

      <div id="text">
        <p>
          Already have an account? <RouterLink to="/login">Sign In</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
export default {
  props: ['name', 'email'],
  data() {
    return {
      // step: this.step-inner,
      // file1: "",
      // src1: "",
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        birthdate: "",
      },
    };
  },
  mounted() {
    if(this.name && this.name != 'undefined') this.form.name = this.name
    if(this.email && this.email != 'undefined') this.form.email = this.email
    // this.step = this.step-inner;
    // const test = moment 
    // var years = this.$moment().diff('1981-01-01', 'years');
    // console.log(years);
  },
  methods: {
    next() {
      if(!this.formValidation()){
        return
      };
      this.$emit("nextStep");
      this.$emit("saveForm", this.form);
    },
    prev() {
      this.$emit("prevStep");
    },
    formValidation() {
      for (let key in this.form) {
        if (this.form[key] == "") {
          alert("Please fill the " + key + " field");
          return;
        }
      }
      if (this.form.password != this.form.confirm_password) {
        alert("Password and Confirm Password doesn't match");
        return;
      }

      if(this.getAge(this.form.birthdate) < 18){
        alert("You must be at least 18 years to register");
        return;
      }
      return true;
      
    },
    getAge(date) {
        let age = this.$moment().diff(date, 'years');
        return age
    }
    // uploadFile() {
    //     this.file1 = this.$refs.file1.files[0];
    //     this.src1 = URL.createObjectURL(this.file1);
    // }
  },
};
</script>