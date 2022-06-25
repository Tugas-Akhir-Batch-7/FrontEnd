<template>
<div class="flex-shrink-0 p-3 d-flex flex-column bg-light" style="width: 280px;">
  <a href="/" class="mb-3 d-flex align-items-center mb-md-0 me-md-auto link-dark text-decoration-none">
    <span class="fs-4">Sidebar</span>
  </a>
  <hr>
  <ul class="mb-auto nav nav-pills flex-column">
      <!-- <RouterLink class="nav-link link-dark" to="/guru_dashboard1">Batch</RouterLink> -->
      <!-- <RouterLink class="nav-link link-dark" to="/guru/pertemuan">Pertemuan</RouterLink> -->
      <RouterLink to="/admin/list-guru" class="nav-link link-dark">Guru</RouterLink>
      <RouterLink to="/admin/list-murid" class="nav-link link-dark">Murid</RouterLink>
      <a href="#" class="nav-link link-dark">Tagihan</a>
      <a href="#" class="nav-link link-dark">Pembayaran</a>
      <!-- <a href="#" class="nav-link link-dark">Customers</a> -->
  </ul>
</div>

</template>