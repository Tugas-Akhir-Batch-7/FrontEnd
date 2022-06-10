<style>
@import '../assets/style.css';
</style>

<template>
    <div class="background">
        <div class="window">

            <div id="signup_icon">
                <img src="https://via.placeholder.com/150" alt="" srcset="">
            </div>

            <div id="title">Bebas</div>

        <form style="justify-content: center;">

            <div>
                <input class="fields" type="text" name="username" id="text" placeholder="Your Name">
            </div>

             <div>
                <input class="fields" type="email" name="email" id="text" placeholder="Your E-mail">
            </div>

            <div>
                <div>
                    <input class="fields" type="password" name="password" id="text" placeholder="Password">
                </div>
                <div>
                    <input class="fields" type="password" name="password.confirm" id="text" placeholder="Confirm Password">
                </div>
            </div>

            <div>
                <!-- <input class="fields" type="date" name="user_birthdate" id="text" placeholder="Date of Birth"> -->
                <input class="fields" id="text" type="text" placeholder="Date of Birth" onfocus="(this.type='date')" onblur="(this.type='text')" >
            </div>

        </form>

            <button class="buttons" id="text">Next</button>
        
        <div id="text">
            <p>Already have an account? Sign In</p>
        </div>
        </div>

    </div>
    
</template>

<script>


</script>