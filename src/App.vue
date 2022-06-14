<style>
@import './assets/style.css';
</style>

<template>
 
 <header class="navbar">
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <br>
    <RouterLink to="/login">Sign In</RouterLink>
    <br>
    <RouterLink to="/signup">Sign Up _ Data</RouterLink>
    <br>
    <RouterLink to="/signup_2">Sign Up _ KTP</RouterLink>
    <br>
    <RouterLink to="/signup_3">Sign Up _ PFP</RouterLink>
    <br>
    <RouterLink to="/signup_4">Sign Up _ Verify</RouterLink>
    <br>
    <RouterLink to="/forgot_password">Lupa Pass</RouterLink>
  </nav>
</header>

<RouterView/>


</template>

<script>

</script>