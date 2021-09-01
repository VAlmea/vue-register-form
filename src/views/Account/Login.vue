<template>
  <v-card elevation="2" class="my-16">
    <v-card-title>Log In</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- FIRST NAME & LAST NAME -->
        <v-text-field
          v-model="user"
          :rules="emailRules"
          label="First name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :rules="nameRules"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-btn color="warning" @click="login">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    user: "",
    password: "",
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    login() {
      if (this.$refs.form.validate) {
        axios
          .post(
            "http://localhost:5000/api/account/login",
            { email: this.user, password: this.password },
            {}
          )
          .then((result) => {
            console.log(result.data);
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style>
</style>