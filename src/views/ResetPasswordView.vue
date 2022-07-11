<template>
  <main>
    <div class="d-flex items-center justify-content-center mx-auto mt-3">
      <keep-alive include="Step1Vue, Step2Vue">
        <Step1Vue 
        @next="next"
        @saveForm="saveEmailForm"
        v-if="step === 1" />

        <Step2Vue 
        :email="data.email"
        @saveForm="saveOtpForm"
        @next="next"
        v-else-if="step === 2" />

        <Step3Vue
        :otp="data.otp"
        :email="data.email"
         v-else />
      </keep-alive>
    </div>
  </main>
</template>

<script>
import Step1Vue from "@/components/PasswordRecovery/Step1.vue";
import Step2Vue from "@/components/PasswordRecovery/Step2.vue";
import Step3Vue from "@/components/PasswordRecovery/Step3.vue";

import { ref, reactive } from "vue";

export default {
  components: {
    Step1Vue,
    Step2Vue,
    Step3Vue,
  },
  setup() {
    let step = ref(1);
    let data = reactive({
      // name: decodeURIComponent(this.$route.query.name), 
      // email: decodeURIComponent(this.$route.query.email), 
      // profile: decodeURIComponent(this.$route.query.picture)
      email: "",
      otp: "",
    })

    const saveEmailForm = (form) => {
      // console.log('halo')
      // console.log(form);
      data.email = form.email;
    }
    const saveOtpForm = (form) => {
      // console.log(form);
      data.otp = form.otp;
    }

    const next = () => {
      step.value++;
    };

    const prev = () => {
      step.value--;
    };
    return {
      //
      next,
      prev,
      step,
      data,
      saveEmailForm,
      saveOtpForm,
    };
  },
};
</script>

<style>
</style>