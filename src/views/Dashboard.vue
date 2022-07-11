<template>
    <img src="./assets/logo.png">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-5">{{ msg }}</h1>
              <p class="lead">sekarang kita coba tambilkan css bootstrap yang lain</p>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</template>
<script>
// import LoginVue from '@/components/Login/Login.vue';
import axios from "axios";
export default {
  data: () => ({
    test: "test ya",
    email: "",
    password: "",
  }),
  methods: {}
};
</script>
