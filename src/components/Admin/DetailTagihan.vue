<template>
  <div class="container p-4">
    <h2>Detail Tagihan</h2>
    <!-- <div class="my-4">
      <div class="row">
        <div class="col-md-2">
          <span> Nama : </span>
        </div>
        <div class="col-md-4 offset-md-1">
          <span> Aziz </span>
        </div>
      </div>
    </div> -->
    <div class="my-4">
      <!-- https://getbootstrap.com/docs/5.0/content/typography/#description-list-alignment -->
      <dl class="row">
        <dt class="col-sm-3">Nama</dt>
        <dd class="col-sm-9">{{detailTagihan.name}}</dd>

        <dt class="col-sm-3">Batch</dt>
        <dd class="col-sm-9">{{detailTagihan.batch_name}}</dd>

        <dt class="col-sm-3">Total Tagihan</dt>
        <dd class="col-sm-9">
          <span>{{detailTagihan.total_bill}}</span>
        </dd>

        <dt class="col-sm-3">DP</dt>
        <dd class="col-sm-9">
          <span>{{detailTagihan.dp}}</span>
        </dd>

        <dt class="col-sm-3">Status</dt>
        <dd class="col-sm-9">
          <span v-if="detailTagihan.is_lunas">
            Lunas
          </span>
          <span v-else>
            Belum Lunas
          </span>
        </dd>
      </dl>
    </div>
    <div class="row">
      <h3>List Pembayaran</h3>
      <div class="my-2">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bayar</th>
              <th scope="col">Waktu Pembayaran</th>
              <!-- <th scope="col">Handle</th>   -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in listData" :key="i.id">
              <td>{{index + 1}}</td>
              <td>{{i.amount}}</td>
              <td>{{i.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- {{detailTagihan}} -->
      <!-- {{listPembayaran}} -->
      <!-- <table></table> -->
    </div>
  </div>
</template>

<script>
export default {

  async beforeCreate() {
    await this.$store.dispatch('pembayaran/fetchPembayaranByTagihanId', this.$route.params.id);
    await this.$store.dispatch('tagihan/fetchTagihanById', this.$route.params.id);
    // console.log('beforeCreate DetailPembayaran');
  },
  computed: {
    listData() {
      return this.$store.getters['pembayaran/listPembayaran'];
    },
    detailTagihan() {
      return this.$store.getters['tagihan/detailTagihan'];
    },
  },
};
</script>

<style>
</style>