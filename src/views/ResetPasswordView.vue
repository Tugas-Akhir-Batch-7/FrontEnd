<template>
  <main>
    <div class="d-flex items-center justify-content-center mx-auto mt-3">
      <Step1Vue v-if="step === 1" />
      <Step2Vue v-else-if="step === 2" />
      <Step3Vue v-else />
    </div>
  </main>
</template>

<script>
import Step1Vue from "@/components/PasswordRecovery/Step1.vue";
import Step2Vue from "@/components/PasswordRecovery/Step2.vue";
import Step3Vue from "@/components/PasswordRecovery/Step3.vue";

import { ref } from "vue";

export default {
  components: {
    Step1Vue,
    Step2Vue,
    Step3Vue,
  },
  setup() {
    let step = ref(1);

    return {
      //
      step,
    };
  },
};
</script>

<style>
</style>