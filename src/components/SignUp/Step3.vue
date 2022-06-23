<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form
        style="justify-content: center"
        class="pfp_fields"
        input
        type="image"
      ></form>

      <div id="text" style="white-space: nowrap">
        <p>Upload an image as Your Profile Picture</p>
      </div>

      <div>
        <button @click="next" class="buttons" id="text">Next</button>
        <br>
        <button @click="prev" class="buttons" id="text">Back</button>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$emit("nextStep");
    },
    prev() {
      this.$emit("prevStep");
    },
  },
};
</script>
