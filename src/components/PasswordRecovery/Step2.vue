<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form @submit.prevent="confirmOtp" style="justify-content: center">
        <div id="text">
          <p>Almost there</p>
          <p>Enter the verification code we've sent to {{ props.email }}</p>
        </div>

        <br />

        <div>
          <!-- <label for="email" style="margin-left: 5%;">Enter your email here</label> -->
          <input
            v-model="form.otp"
            class="fields"
            type="number"
            name="email"
            id="text"
            placeholder="Verification Code"
          />
        </div>
        <div class="d-flex justify-content-center">
          <input type="submit" class="buttons" value="Verify Your Account" />
        </div>
      </form>

      <br />

      <!-- <button @click="next" class="buttons" id="text"
        >Verify Your Account</button
      > -->
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const form = reactive({
      // email: props.email,
      otp: "",
    });
    const next = () => {
      context.emit("next");
    };
    const prev = () => {
      context.emit("prev");
    };
    const saveForm = () => {
        context.emit("saveForm", form);
    };

    onMounted(() => {
      // console.log(props.email);
      // context.emit("setTitle", "Almost there");
    });
    const confirmOtp = async () => {
      // console.log(form.email);
      // context.emit("next");
      try {
        const res = await axios.post("confirmOtp", {
          email: props.email,
          otp: form.otp,
        });
        saveForm()
        context.emit("next");
        // console.log(res);
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          //   alert("Email not found");
          // console.log(error);
        }
        // console.log(error);
      }
    };

    return {
      form,
      next,
      prev,
      props,
      confirmOtp,
    };
  },
};
</script>