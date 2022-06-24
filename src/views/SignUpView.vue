<script setup>
import SignUpVue from '../components/SignUp/Step1.vue';
import SignUpVue2 from '../components/SignUp/Step2.vue';
</script>

<template>
  <main>
    <SignUpVue />
    <button @click="klick">{{count}}</button>
  </main>
</template>


<script>
// import LoginVue from '@/components/Login/Login.vue';
import axios from "axios";
export default {
  data: () => ({
    count:0
  }),
  methods: {
    async klick() {
      this.count++
      console.log(this.count)
    },async qwerty() {
      this.count++
      console.log(this.count)
    },
  },
};
</script>