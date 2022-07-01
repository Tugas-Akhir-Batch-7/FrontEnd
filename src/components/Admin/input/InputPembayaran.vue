<template>
  <div class="container p-4">
    <div class="row">
      <div class="col-8">
        <h2>Input Pembayaran</h2>
        <div class="my-4">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="murid" class="form-label">Tagihan</label>
              <select
                name="murid"
                id="murid"
                class="form-control"
                v-model="form.id_tagihan"
                @change="onChangeTagihan($event)"
              >
                <option value="" disabled>Pilih Murid</option>
                <option
                  :value="tagihan.id"
                  v-for="tagihan in listTagihan"
                  :key="tagihan.id"
                >
                  {{ tagihan.name }}
                </option>
                <!-- <option value="1">Murid 1</option>
                <option value="2">Murid 2</option>
                <option value="3">Murid 3</option> -->
              </select>
            </div>
            <!-- {{ listMuridMendaftar}} -->
            <div class="mb-3">
              <label for="tagihan" class="form-label">Jumlah kekurangan</label>
              <input
                disabled
                v-model="form.kekurangan"
                type="number"
                class="form-control"
                id="tagihan"
                placeholder="Total tagihan akan tergenerate otomatis sesuai murid yang dipilih"
              />
            </div>
            <div class="mb-3">
              <label for="dp" class="form-label">Bayar</label>
              <div class="d-flex">
                <input
                  v-model="form.bayar"
                  type="number"
                  class="form-control"
                  id="dp"
                  placeholder="contoh: 1000000"
                  :max="form.kekurangan"
                  required
                />
                <button @click.prevent="clickSetLunas" class="btn btn-success ms-4 px-4">Lunas</button>
              </div>
            </div>

            <!-- <span>
              {{ form.tagihan }}
              {{ form.dp }}
              {{ form.id_murid }}
            </span> -->
            <div class="my-4">
              <input class="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <!-- {{listTagihan}} -->
        <!-- <hr /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from "@vue/reactivity";
import store from "@/store";
export default {
  // setup() {
  //   const form = reactive({
  //     tagihan: '',
  //     dp: '',
  //   });

  //   return {

  //   };
  // }}
  data() {
    return {
      form: {
        kekurangan: "",
        bayar: "",
        id_tagihan: "",
      },

      listData: [],
    };
  },
  computed: {
    listMuridMendaftar() {
      return this.$store.getters["murid/listMurid"];
    },
    listTagihan() {
        return this.$store.getters["tagihan/listTagihan"];
    }
  },
  async beforeCreate() {
    // console.log(this.$store.getters["auth/user"].role);
    await this.$store.dispatch("murid/fetchMuridMendaftar");
    await this.$store.dispatch("tagihan/fetchTagihanAndTerbayar");

  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("pembayaran/createPembayaran", this.form);
        await this.$router.push("/admin/list-pembayaran");
      } catch (error) {}
      // console.log(this.form);
      // this.$router.push("/admin/input-tagihan");
    },
    async onChangeTagihan(event) {
      // console.log(id);
      console.log(event.target.value);
      let dataTagihan = this.listTagihan.find(
        (data) => data.id == event.target.value
      );
        this.form.kekurangan = dataTagihan.kekurangan;
    //   this.form.tagihan = dataMurid.pay;
      // console.log(dataMurid);
      // this.form.id_murid = id;
    },

   clickSetLunas(){
      this.form.bayar = this.form.kekurangan;
    }
  },
};
</script>

<style>
</style>