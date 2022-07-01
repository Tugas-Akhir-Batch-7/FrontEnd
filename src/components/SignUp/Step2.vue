<template>
  <div class="background">
    <div class="window">
      <!-- <div id="signup_icon">
        <img src="https://via.placeholder.com/150" alt="" srcset="" />
      </div>

      <div id="title">Bebas</div> -->

      <form style="justify-content: center">
        <div class="image_fields" input type="image">
          <img :src="src1" alt="" style="width: 100%">

        </div>

        <div id="text" style="margin-left: 25%" class="py-4">
          <p>Upload an image of Your ID card</p>
          <input required type="file" id="file1" ref="file1" @input="uploadKTP()" />
        </div>
      </form>

      <div>
        <button class="buttons" id="text" @click="next">Next</button>
        <br />
        <button class="buttons" id="text" @click="prev">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file1: "",
      src1: "",
    };
  },
  methods: {
    next() {
      this.$emit("nextStep");
      this.$emit("saveKTP", this.file1);
    },
    prev() {
      this.$emit("prevStep");
    },
    uploadKTP() {
      // this.file1
      const file = this.$refs.file1.files[0];
      this.file1 = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.src1 = e.target.result;
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    },
  },
};
</script>