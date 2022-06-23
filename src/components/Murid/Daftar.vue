<style>
/* @import '..\..\assets\dashboard.css'; */
@import '../../assets/dashboard.css';

#table_header{
    display: inline-flex;
    width:33.3%;
    height: 10%;
    background-color: rgba(0, 0, 0, 0.5); 

    justify-content: center;
    align-items: center;
}

</style>

<template>


<!-- navbar -->
<div class="navigation">
        <RouterLink to="/login" class="nav_button"> Tugas</RouterLink>
        <RouterLink to="/login" class="nav_button"> Jadwal</RouterLink>
        <RouterLink to="/login" class="nav_button"> Profil</RouterLink>
        <RouterLink to="/login" class="nav_button"> Administrasi</RouterLink>
        <div @click="handleLogout" class="nav_button"> Log Out</div>
</div>

<!-- content -->
<div style="display: inline-flex; justify-content: space-around;">
    <!-- sidebar -->
        <span class="sidebar">
            <div id="sidebar_button">
                Session
            </div>
            <div id="sidebar_button">
                Absensi
            </div>
            <div id="sidebar_button">
                Ujian
            </div>
        </span>
        <span class="main_window">
            <div id="table_header" style="border-top-left-radius: 25px;">
                Hari, Tanggal
            </div>
            <div id="table_header">
                Jam
            </div>
            <div id="table_header" style="border-top-right-radius: 25px;">
                Materi
            </div>
        </span>
</div>

</template>

<script>
export default {
      methods: {
        async handleLogout() {
            try {
                await this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>