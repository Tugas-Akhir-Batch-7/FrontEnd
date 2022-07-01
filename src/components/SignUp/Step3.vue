<template>
  <div class="background">
    <div class="window">
      <!-- <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div> -->

      <!-- <div id="title">Bebas</div> -->
      <form action="">
        <div
          style="justify-content: center"
          class="pfp_fields"
          input
          type="image"
        >
          <img :src="src2" alt="" style="width: 100%" />
        </div>

        <div
          class="
            d-flex
            flex-column
            justify-content-center
            align-items-center
            mb-3
          "
          id="text"
          style="white-space: nowrap"
        >
          <p>Upload an image as Your Profile Picture</p>
          <input
            class=""
            required
            type="file"
            id="file2"
            ref="file2"
            @input="uploadPicture()"
          />
        </div>
      </form>

      <div>
        <button @click="next" class="buttons" id="text">Next</button>
        <br />
        <button @click="prev" class="buttons" id="text">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file2: "",
      src2: "",
    };
  },
  methods: {
    next() {
      this.$emit("nextStep");
      this.$emit("savePicture", this.file2);
      this.$emit("sendForm");
    },
    prev() {
      this.$emit("prevStep");
    },
    uploadPicture() {
      this.file2 = this.$refs.file2.files[0];
      this.src2 = URL.createObjectURL(this.file2);
    },
  },
};
</script>
