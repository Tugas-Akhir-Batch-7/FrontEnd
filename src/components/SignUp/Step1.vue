<template>
    <div class="background">
        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>

        

          <form @submit.prevent="submitForm" style="justify-content: center;">
  
              <div>
                  <input v-model="register.nama" class="fields" type="text" placeholder="Your Name">
              </div>
  
               <div>
                  <input v-model="register.email" class="fields" type="email" placeholder="Your E-mail">
              </div>
  
              <div>
                  <div>
                      <input v-model="register.password" class="fields" type="password" placeholder="Password">
                  </div>
                  <div>
                      <input v-model="register.confirmPassword" class="fields" type="password" placeholder="Confirm Password">
                  </div>
              </div>

               <!-- <div>
                <input v-model="register.tanggalLahir" class="fields" placeholder="Date of Birth" onfocus="(this.type='date')">
               </div> -->

              <button class="buttons" id="text" style="margin-left:120px">Signup</button>
  
          </form>
        
        <div id="text">
            <p>Already have an account? <RouterLink to="./login" style="text-decoration: none">Sign In</RouterLink></p>
        </div>
        </div>

    </div>
    
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs, alphaNum, minValue } from "@vuelidate/validators";

const oneNumber = (value) => /[0-9]/.test(value)



export default {

    setup: () => ({ v$: useValidate() }),
    data (){
        return{
            register: {
              nama: '',
              email: '',
              password: '',
              confirmPassword: '',
              tanggalLahir: '',
            }
        };
    },

    validations(){
            return {
              register: {
                nama: {required},
                email: {required, email},
                password: {required, min: minLength(8), oneNumber, alphaNum},
                confirmPassword: {required, sameAsPassword: sameAs(this.register.password)},
                // tanggalLahir: {required, min: minValue(18)}
              }
            }
        },

    methods: {
        submitForm(){
            this.v$.$validate()
            if (!this.v$.$error) {
                alert('Form Valid')
            } else {
                alert('Form Invalid')
            }
        },

        // umur(){
        //     var dob = this.register.tanggalLahir;
        //     var year = Number(dob.substr(0, 4));
        //     var month = Number(dob.substr(4, 2)) - 1;
        //     var day = Number(dob.substr(6, 2));
        //     var today = new Date();
        //     var age = today.getFullYear() - year;
        //         if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        //             age--;
        //         }
        //     alert(age);
        //     return this.register.tanggalLahir = age
        // }
    }
    
}   

</script>