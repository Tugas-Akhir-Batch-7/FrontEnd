<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form @submit.prevent="resetPassword" style="justify-content: center">
        <div id="text">
          <p>You are eligible to reset the password</p>
          <p>Please enter your new password below</p>
        </div>

        <div>
          <!-- <label for="email" style="margin-left: 5%;">Enter your email here</label> -->
          <input
            v-model="form.password"
            class="fields"
            type="password"
            name="password"
            id="text"
            placeholder="password"
          />
        </div>
        <div>
          <!-- <label for="password" style="margin-left: 5%;">Enter your password here</label> -->
          <input
            v-model="form.password_confirmation"
            class="fields"
            type="password"
            name="password_confirmation"
            id="text"
            placeholder="password confirmation"
          />
        </div>

        <div class="d-flex justify-content-center">
          <input type="submit" class="buttons" value="Verify Your Account" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
    otp: {
      required: true,
    },
  },

  setup(props, context) {
    const route = useRouter();
    const form = reactive({
      password: "",
      password_confirmation: "",
    });
    

    const resetPassword = async () => {
      try {
        formValidation();
        const res = await axios.post("/resetPass", {
          password: form.password,
          email: props.email,
          otp: props.otp,
        });
        if (res.status === 200) {
          //   context.emit("next");
          route.push("/login");
        }
      } catch (error) {
        // console.log(error);
        alert(error);
      }
    };

    const formValidation = () => {
      if (form.password === form.password_confirmation) {
        return true;
      } else {
        throw "Password does not match";
      }
    };
    onMounted(() => {
      console.log(props.email);
      console.log(props.otp);
      // context.emit("setTitle", "Almost there");
    });
    return {
      form,
      resetPassword
    };
  },
};
</script>