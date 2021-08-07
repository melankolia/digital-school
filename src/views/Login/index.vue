<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12" sm="6">
      <div
        class="primary d-flex flex-column justify-end"
        :style="`height: 100%; background-image: url(${backgroundImage})`"
      >
        <div class="d-flex flex-row align-center mx-10 mb-11">
          <img
            width="102"
            height="99"
            src="@/assets/image/smansa.png"
            alt="smansa"
            class="mr-4"
          />
          <div class="d-flex flex-column white--text">
            <p class="school-name ma-0">SMAN 1 Kota Jambi</p>
            <p class="school-address ma-0">
              Jl. Jenderal Urip Sumoharjo Lorong Pustu Sei. Putri No.15 <br />
              Kel, Sungai Putri, Kec. Telanaipura, Kota Jambi, Jambi <br />
              36122
            </p>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" xs="12" sm="6">
      <v-form
        id="formLogin"
        ref="formLogin"
        v-model="valid"
        lazy-validation
        @submit.prevent="onSubmit()"
      >
        <div class="d-flex flex-column buku-style mb-11">
          <p class="app-name">BUKU INDUK SMANSA</p>
          <p class="login-name">Login</p>
          <v-divider class="mb-6" />
          <p class="label-style mb-3">Username</p>
          <v-text-field
            v-model="payload.username"
            :rules="rules.username"
            small
            filled
            outlined
          />
          <p class="label-style mb-3">Password</p>
          <v-text-field
            v-model="payload.password"
            :rules="rules.password"
            small
            filled
            outlined
            :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
          />
          <v-checkbox label="Remember Me" color="checkboxBg" />
          <v-btn
            class="py-6"
            block
            color="primary"
            type="submit"
            form="formLogin"
            :disabled="!valid"
            :loading="loading"
          >
            Sign In
          </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import BackgroundImage from "@/assets/image/background.png";
import { mapActions } from "vuex";
import { LOGIN } from "@/store/constants/actions.type";

export default {
  data() {
    return {
      backgroundImage: BackgroundImage,
      loading: false,
      valid: false,
      e1: true,
      rules: {
        username: [(v) => !!v || "Username is Required !"],
        password: [(v) => !!v || "Password is Required !"],
      },
      payload: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions([LOGIN]),
    onSubmit() {
      if (this.$refs.formLogin.validate()) {
        this.loading = true;
        this[LOGIN](this.payload)
          .then(({ status, message }) => {
            if (status == 200) {
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: "Login Berhasil",
                color: "success",
              });
            } else {
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: message || "Login Gagal",
                color: "error",
              });
            }
          })
          .catch((err) => {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: err || "Login Gagal",
              color: "error",
            });
          })
          .finally(() => (this.loading = false));
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped>
.school-name {
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: 0em;
}

.school-address {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
}

.app-name {
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.75px;
}

.login-name {
  font-family: "Montserrat";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.75px;
}

.label-style {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: 0.75px;
}

.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}

.buku-style {
  margin: 160px 120px 0 103px;
}
</style>
