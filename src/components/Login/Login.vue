<template>
    <div class="background">
        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>

        <form style="justify-content: center;">

             <div>
                <input class="fields" type="email" name="email" placeholder="Your E-mail" v-model="email">
            </div>

            <div>
                <input class="fields" type="password" name="password" placeholder="Password" v-model="password">
            </div>

        </form>

            <button class="buttons" id="text" @click="submitForm">Sign In</button>
        
            <div id="text">
                <p>Forgot your Password? Click <RouterLink to="/forgot_password">here</RouterLink></p>
            </div>

            
            <div id="text">
                <p>Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></p>
            </div>
                
        </div>

    </div>
    
</template>

<script>

import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
    data (){
        return{
            v$: useValidate(),
            email: '',
            password: '',
        };
    },

    methods: {
        submitForm(){
            this.v$.$validate()
            if (!this.v$.$error) {
                alert('Login Berhasil')
            } else {
                alert('Login Gagal')
            }
        },
    },
    
    validations(){
            return {
                email: {required, email},
                password: {required}
                
            }
        }
}   
</script>