<template>
  <v-container justify-center align-center fill-height>
    <v-form ref="signup" @keyup.enter="login()">
      <v-card class="radius-10" max-width="800">
        <v-toolbar color="teal darken-4"  elevation="0">
          <v-toolbar-title class="white--text font-weight-light text-center full-width">Iniciar sesion
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text style="width:800px">
          <v-form>
            <v-text-field label="Documento" outlined class="login" color="teal darken-4" v-model="user.username" type="number">
            </v-text-field>
            <v-text-field label="Password" outlined type="password" class="login" color="teal darken-4" v-model="user.password">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :loading="loading" class="black--text font-weight-light" @click="login()">Iniciar
            sesion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    layout: "empty",
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        error: false,
        loading: false
      };
    },
    created() {
      if (this.$store.$auth.$state.loggedIn == true) {
        this.$router.push("/");
      }
    },
    methods: {
      async login() {
        this.loading = true
        try {
          await this.$auth.loginWith("local", {
            data: {
              identifier: this.user.username,
              password: this.user.password
            }
          });
          return this.$router.push('/')
        } catch (e) {
          this.loading = false
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      }
    }
  };

</script>


<style scoped>
  .card-login {
    background: #2b4c81;
  }

</style>
