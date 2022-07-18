<template>
  <!-- <div
    class="flex-shrink-0 p-3 d-fixed d-lg-flex flex-column bg-light menubar"
    style="width: 280px"
  > -->
  <div class="bg-light menubar">
    <!-- <a href="/" class="mb-3 d-flex align-items-center mb-md-0 me-md-auto link-dark text-decoration-none">
    <span class="fs-4">Sidebar</span>
  </a>
  <hr> -->
    <ul
      class="mb-auto overflow-scroll p-lg-3 scrollbar-display-none flex-lg-row flex-column nav nav-pills d-flex d-lg-block menu-ul"
    >
      <!-- <RouterLink class="nav-link link-dark" to="/guru_dashboard1">Batch</RouterLink> -->
      <!-- <RouterLink class="nav-link link-dark" to="/guru/pertemuan">Pertemuan</RouterLink> -->
      <RouterLink
        to="/admin/list-guru"
        class="flex-shrink-0 px-4 nav-link link-dark d-flex align-items-center justify-content-center justify-content-lg-start menu-w-h"
        
      >
        <span class="logo-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-video3"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z"
            />
            <path
              d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z"
            />
          </svg>
        </span>
        Guru
      </RouterLink>
      <RouterLink
        to="/admin/list-murid"
        class="flex-shrink-0 px-4 nav-link link-dark d-flex align-items-center justify-content-center justify-content-lg-start menu-w-h"
        
      >
        <span class="logo-menu"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
            <path
              fill-rule="evenodd"
              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg
        ></span>
        Murid</RouterLink
      >
      <RouterLink
        to="/admin/list-tagihan"
        class="flex-shrink-0 px-4 nav-link link-dark d-flex align-items-center justify-content-center justify-content-lg-start menu-w-h"
        
      >
        <span class="logo-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-receipt"
            viewBox="0 0 16 16"
          >
            <path
              d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
            />
            <path
              d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </span>
        Tagihan</RouterLink
      >
      <RouterLink
        to="/admin/list-pembayaran"
        class="flex-shrink-0 px-4 nav-link link-dark d-flex align-items-center justify-content-center justify-content-lg-start menu-w-h"
        
      >
        <span class="logo-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-wallet"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"
            />
          </svg>
        </span>

        Pembayaran</RouterLink
      >
      <!-- <a href="#" class="nav-link link-dark">Tagihan</a> -->
      <!-- <a href="#" class="nav-link link-dark">Pembayaran</a> -->
      <!-- <a href="#" class="nav-link link-dark">Customers</a> -->
    </ul>
  </div>
</template>

<style scoped>
.logo-menu {
  margin-right: 0.5em;
}
.menubar {
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
}

.menu-w-h {
  min-width: 28%;
  height: 100%;
}

.menu-ul {
  height: 100%;
}

@media (min-width: 992px) {
  .menubar {
    position: relative;
    height: auto;
    width: 270px;
  }
  .menu-w-h {
    width: 100%;
    max-height: 60px ;
  }
  .menu-ul {
  height: 100vh;
}
}

.scrollbar-display-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-display-none {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

