<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="container-fluid text-sm-center p-5 bg-light">
          <!-- bg-light is background color & p-5 is padding -->
          <img src="../assets/logo.png" alt="" />
        </div>
        <h2 class="mb-3 mt-3">Login</h2>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            v-model="$store.state.login.userEmail"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            v-model="$store.state.login.userPassword"
            placeholder="Password"
          />
        </div>
        <div></div>
      </div>
      <div class="col">
        <img
          src="../assets/bicycle.jpg"
          style="width: 100%; height: auto"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
