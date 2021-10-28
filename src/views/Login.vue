<template>
  <b-row class="vh-100" align-v="center" align-h="center">
    <b-col cols="4">
      <b-card id="login-card" title="Sign Up" body-class="text-center">
        <b-card-text>
          <b-form @submit="onSubmit">
            <b-form-group
                label="Email:"
                label-for="input-email"
            >
              <b-form-input
                  id="input-email"
                  v-model="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  :state="isValid"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Password:" label-for="input-password">
              <b-form-input
                  id="input-password"
                  type="password"
                  v-model="password"
                  placeholder="Enter password"
                  required
                  :state="isValid"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isValid: null
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.email === process.env.VUE_APP_LOGIN_HARD_CODE_EMAIL
          && this.password === process.env.VUE_APP_LOGIN_HARD_CODE_PASSWORD) {
        localStorage.isAuthenticated = true;
        this.$router.push('/stock-price')
        this.isValid = true
      } else {
        this.$bvToast.toast('You have entered an invalid email or password', {
          title: 'Invalid Credentials',
          autoHideDelay: 5000,
          variant: 'danger',
          toaster: 'b-toaster-top-center'
        })
        this.isValid = false
      }
    },
  }
}
</script>
<style>
#login-card {
  border-color: #1D2675
}
</style>