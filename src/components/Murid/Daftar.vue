<style>
@import'..\assets\dashboard.css';

</style>

<template>

<div class="header">

    <!-- company logo -->
    <div class="company_space">

        <div id="header_logo">
            <img src="https://via.placeholder.com/100" alt="">
        </div>

        <div id="company_name">
            <p>Bebas</p>
        </div>
    </div>
    

    
    
    <!-- user profile -->
        <div class="user_profile">
        <div id="user_pfp">

        </div>
        <div id="user_name">
            <p>My Full Name</p>
            <p>My Batch Info</p>
        </div>
    
    </div>
    
</div>
<!-- navbar -->
<div class="navigation">
    <div>
        <RouterLink to="/login" class="nav_button"> Daftar</RouterLink>
    </div>

    <div>
        <RouterLink to="/login" class="nav_button"> Profil</RouterLink>
    </div>

    <div>
        <RouterLink to="/login" class="nav_button"> Log Out</RouterLink>
    </div>
</div>


<!-- sidebar -->
<div class="sidebar">

</div>

<!-- main window -->

</template>

<script>

</script>