<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <br>
    <a v-if="isLoading">正在登录</a>
    <template v-else-if="data">
      <a href="">{{ data.loginId }}</a>
    </template>
    <router-link v-else to="/login">login</router-link>
  </nav>
  <router-view />
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState("loginUser", ["data", "isLoading"])
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
