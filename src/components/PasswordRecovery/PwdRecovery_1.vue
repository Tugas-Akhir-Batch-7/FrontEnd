<template>
    <div class="background">
        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>

        <form style="justify-content: center;">

            <div id="text">
                <p>Password Recovery</p>
            </div>

            <br>

             <div>
                <label for="email" style="margin-left: 5%;">Enter your email here</label>
                <input class="fields" type="email" name="email" id="text" placeholder="Your E-mail">
            </div>

        </form>

            <br>

            <button class="buttons" id="text"><RouterLink to='/forgot_password2'> Send Verification Code</RouterLink></button>
        
        </div>

    </div>
    
</template>

<script>
import PwdRecovery_2 from "./PwdRecovery_2.vue";

</script>