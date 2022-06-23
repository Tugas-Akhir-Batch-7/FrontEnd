<template>
  <main>
    {{ step }}
    <keep-alive>
      <SignUpVue @prevStep="prev" @nextStep="next" v-if="step === 1" />
      <SignUpVue2 @prevStep="prev" @nextStep="next" v-else-if="step === 2" />
      <SignUpVue3 @prevStep="prev" @nextStep="next" v-else-if="step === 3" />
      <SignUpVue4 @prevStep="prev" @nextStep="next" v-else-if="step === 4" />
    </keep-alive>
  </main>
</template>

<script>
import SignUpVue from "../components/SignUp/Step1.vue";
import SignUpVue2 from "../components/SignUp/Step2.vue";
import SignUpVue3 from "../components/SignUp/Step3.vue";
import SignUpVue4 from "../components/SignUp/Step4.vue";

export default {
  components: {
    SignUpVue,
    SignUpVue2,
    SignUpVue3,
    SignUpVue4,
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    next() {
      this.step++;
    },
    prev() {
      this.step--;
    },
  },
};
</script>
