<template>
  <q-layout>
    <q-page-container>
      <router-view @login="login" class="centerPage"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/auth/login')
    }
  }
}
</script>
