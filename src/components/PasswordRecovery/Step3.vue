<template>
    <div class="background">
        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>

        <form style="justify-content: center;">

            <div id="text">
                <p>Please enter your new password below</p>
                <!-- <p>Enter the verification code we've sent to <placeholder> Your Email</placeholder>{{email}}</p> -->
            </div>

            <br>

             <div>
                <!-- <label for="email" style="margin-left: 5%;">Enter your email here</label> -->
                <input class="fields" type="password" name="password" id="text" placeholder="password">
            </div>
            <div>
                <!-- <label for="password" style="margin-left: 5%;">Enter your password here</label> -->
                <input class="fields" type="password" name="password_confirmation" id="text" placeholder="password confirmation">
            </div>

        </form>

            <br>

            <router-link to="/" class="buttons" id="text">Verify Your Account</router-link>

        </div>

    </div>
    
</template>

<script>

</script>