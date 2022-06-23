<template>
  <div class="background">
    <div class="window">
      <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div>

      <form style="justify-content: center">
        <div class="image_fields" input type="image"></div>

        <div id="text" style="margin-left: 25%">
          <p>Upload an image of Your ID card</p>
        </div>
      </form>

      <div>
        <button class="buttons" id="text" @click="next">Next</button>
        <br>
      <button class="buttons" id="text" @click="prev">Back</button>

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