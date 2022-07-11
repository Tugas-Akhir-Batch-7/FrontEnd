<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form
        @submit.prevent="sendVerificationCode"
        style="justify-content: center"
      >
        <div id="text">
          <p>Password Recovery</p>
        </div>

        <br />

        <label for="email">Enter your email here</label>
        <div>
          <input
            required
            v-model="form.email"
            class="fields"
            type="email"
            name="email"
            id="text"
            placeholder="Your E-mail"
          />
        </div>
        <br />
        <div class="d-flex justify-content-center">
          <input type="submit" class="buttons" value="Send Verification Code" />
        </div>
      </form>

      <!-- <RouterLink to="/forgot_password2"
        ><button class="buttons" id="text">
          Send Verification Code
        </button></RouterLink
      > -->
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import axios from "axios";
// import authHeader from "../../services/auth-header";

export default {
  setup(props, context) {
    let form = reactive({
      email: "",
    });
    const next = () => {
      //   saveForm();
      context.emit("next");
    };

    const prev = () => {
      context.emit("prev");
    };

    const saveForm = () => {
    //   console.log(form.email);
      context.emit("saveForm", form);
    };

    const sendVerificationCode = async () => {
      //   console.log(form.email);
      try {
        const res = await axios.post("/resetOtpByEmail", {
          email: form.email,
        });
        //   console.log(res.data.success);
        if (res.data.success) {
          context.emit("saveForm", form);
          context.emit("next");
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          //   alert("Email not found");
          // console.log(error);
        }
      }

      //   context.emit("sendVerificationCode");
    };

    return {
      next,
      prev,
      form,
      sendVerificationCode,
    };
  },
};
</script>