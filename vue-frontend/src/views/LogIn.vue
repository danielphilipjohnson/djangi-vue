<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label>email</label>
            <div class="control">
              <input type="email" class="input" v-model="email" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>

          <hr />

          Or <router-link to="/signup">click here</router-link> to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log In | Djackets";
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";

      // localStorage.removeItem("token");

      const formData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      await axios
        .post("api/auth/login", formData)
        .then((response) => {
          const token = response.data.token;

          this.$store.commit("setToken", token);

          this.$store.dispatch("login");

          axios.defaults.headers.common["Authorization"] = "Token " + token;

          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");

            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>
