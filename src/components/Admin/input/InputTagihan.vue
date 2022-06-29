<template>
  <div class="container p-2 px-4">
    <div class="row">
      <div class="col-8">
        <h2>Input Tagihan</h2>
        <div class="my-4">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="tagihan" class="form-label">Total Tagihan</label>
              <input
                v-model="form.tagihan"
                type="number"
                class="form-control"
                id="tagihan"
                placeholder="1000000"
              />
            </div>
            <div class="mb-3">
              <label for="dp" class="form-label">DP</label>
              <input
                v-model="form.dp"
                type="number"
                class="form-control"
                id="dp"
                placeholder="1000000"
              />
            </div>
            <div class="mb-3">
              <label for="murid" class="form-label">Murid</label>
              <select
                name="murid"
                id="murid"
                class="form-control"
                v-model="form.id_murid"
              >
                <!-- <option value="">Pilih Murid</option> -->
                <option
                  :value="murid.id"
                  v-for="murid in listMuridMendaftar"
                  :key="murid.id"
                >
                  {{ murid.name }}
                </option>
                <!-- <option value="1">Murid 1</option>
                <option value="2">Murid 2</option>
                <option value="3">Murid 3</option> -->
              </select>
            </div>
            <!-- {{ listMuridMendaftar}} -->
            <span>
              {{ form.tagihan }}
              {{ form.dp }}
              {{ form.id_murid }}
            </span>
            <div class="my-4">
              <input class="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
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
        tagihan: "",
        dp: "",
        id_murid: "",
      },

      listData: [],
    };
  },
  computed: {
    listMuridMendaftar() {
      return this.$store.getters["murid/listMurid"];
    },
  },
  async beforeMount() {
    // console.log(this.$store.getters["auth/user"].role);
    await this.$store.dispatch("murid/fetchMuridMendaftar");
  },
  methods: {
    onSubmit() {
      try {
        this.$store.dispatch("tagihan/createTagihan", this.form);
        this.$router.push("/admin/list-tagihan");
      } catch(error) {

      }
      // console.log(this.form);
      // this.$router.push("/admin/input-tagihan");
    },
  },
};
</script>

<style>
</style>