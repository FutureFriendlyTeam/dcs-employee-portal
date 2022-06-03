<template>
  <div class="md:bg-primary min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky :login="false"></main-navigation>

    <div
      class="container mx-auto px-0 md:px-8 flex flex-row items-start justify-center md:my-12 flex-grow"
    >
      <div class="p-4 md:p-8 md:rounded-lg bg-white space-y-4 w-1/2">
        <h2>Sign in</h2>

        <div class="space-y-4">
          <nsw-field v-model="email">Email</nsw-field>
          <nsw-field v-model="password" password>Password</nsw-field>
          <nsw-button primary @click="logInAndGo()">Log In</nsw-button>

          <a href="#">Forgot email or password</a>

          <div class="border border-divider"></div>

          <h2>Not registered?</h2>

          <nsw-button secondary>Create an account</nsw-button>
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import MainFooter from '~/components/mainFooter.vue'
import mainNavigation from '~/components/mainNavigation.vue'
export default {
  name: 'LoginPage',
  components: { mainNavigation, MainFooter },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    logIn() {
      this.$store.dispatch('global/LOG_IN')
    },
    logInAndGo() {
      this.logIn()

      this.$router.push('/')
    },
  },
}
</script>
