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

                <label for="email">Enter your email here</label>
            <div>
                <input class="fields" type="email" name="email" id="text" placeholder="Your E-mail">
            </div>

        </form>

            <br>

            <RouterLink to='/forgot_password2'><button class="buttons" id="text"> Send Verification Code</button></RouterLink>
        
        </div>

    </div>
    
</template>

<script>

</script>