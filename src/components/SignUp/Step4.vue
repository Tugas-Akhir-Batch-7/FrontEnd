<template>
    <div class="background">

        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>


        <form @submit.prevent="completeRegister" style="justify-content: center;">

            <div id="text" style="text-align: center;">
                <p>
                    Almost done! We just sent a verification code to 
                    <br>
                    {{email}}
                    <br>
                    Enter it below to complete your registration
                </p>
            </div>

            <input v-model="otp" id="text" type="text" class="fields" placeholder="Verification Code">
             <button class="buttons mx-auto" id="text">Sign Up</button>

        </form>

        <br>
        
        <br>
        <br>
        <!-- <button @click="prev" class="buttons" id="text">Back</button> -->


        </div>

    </div>
    
</template>

<script>

export default {
  props: {
    email: String,
  },
  data() {
    return {
      email: this.email,
      otp: "",
    };
  },
  methods: {
    next() {
      this.$emit("nextStep");
    },
    prev() {
      this.$emit("prevStep");
    },
    completeRegister() {
      this.$emit("completeRegister", this.otp);
    },
  },
};

</script>



// 

