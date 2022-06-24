<style>
@import './assets/style.css';
</style>

<template>
 
 <header>

  <div class="navbar">

      <!-- <RouterLink to="/">Home</RouterLink> -->
      <RouterLink to="/login">Sign In</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
      <!-- <RouterLink to="/signup_2">Sign Up _ KTP</RouterLink>
      <RouterLink to="/signup_3">Sign Up _ PFP</RouterLink>
      <RouterLink to="/signup_4">Sign Up _ Verify</RouterLink>
      <RouterLink to="/forgot_password">Lupa Pass</RouterLink> -->

  </div>

  <div class="navbar">

      <RouterLink to="/murid_dashboard">Murid</RouterLink>
      <RouterLink to="/guru_dashboard1">Guru</RouterLink>

  </div>
</header>

<RouterView/>


</template>

<script>

</script>