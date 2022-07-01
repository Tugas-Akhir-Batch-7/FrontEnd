<template>
  <main>
    {{ step }}
    <div class="d-flex items-center justify-content-center mx-auto">
      <keep-alive>
        <SignUpVue
          @prevStep="prev"
          @nextStep="next"
          @saveForm="saveForm"
          v-if="step === 1"
        />
        <SignUpVue2
          @prevStep="prev"
          @nextStep="next"
          @saveKTP="saveKTP"
          v-else-if="step === 2"
        />
        <SignUpVue3
          @prevStep="prev"
          @nextStep="next"
          @savePicture="savePicture"
          @sendForm="sendForm"
          v-else-if="step === 3"
        />
        <SignUpVue4
          @prevStep="prev"
          @nextStep="next"
          @completeRegister="completeRegister"
          :email="form.email"
          v-else-if="step === 4"
        />
      </keep-alive>
    </div>
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
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        birthdate: "",
        ktp: "",
        profile: "",

        //todo
        address: "test",
        contact: "0823241212",
        birthday: "12/12/1996"
      },
    };
  },
  methods: {
    next() {
      this.step++;
    },
    prev() {
      this.step--;
    },
    saveForm(form) {
      this.form = form;
      // console.log(form);
    },
    saveKTP(file) {
      this.form.ktp = file;
      // console.log(file);
    },
    savePicture(file) {
      this.form.profile = file;
      // console.log(file);
    },
    async sendForm() {
      await this.$store.dispatch("auth/registerOtp", this.form);
      // console.log(this.form);
    },
    async completeRegister(otp) {
      this.form.otp = otp;
      //todo
      this.form.address = "test";
      this.form.contact = "0823241212";
      this.form.birthday = this.form.birthdate;

      await this.$store.dispatch("auth/register", this.form);
      // console.log(this.form);
    },
  },
};
</script>
