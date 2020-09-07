<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/">Home</router-link>
    </v-app-bar>
    <v-main class="main">
      <router-view />
    </v-main>
    <v-navigation-drawer :absolute=true class="sidebar">
      <div class="navigation-block">
        <router-link to="/">
          <v-btn color="primary">Home</v-btn>
        </router-link>
        <router-link to="/videolist">
          <v-btn color="primary">VideoList</v-btn>
        </router-link>
        <router-link to="/datatable">
          <v-btn color="primary">DataTable</v-btn>
        </router-link>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.navigation-block {
  margin: 74px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    display: block;
    margin: 10px 0;
  }
}
a {
  text-decoration: none;
}
.main {
  margin-left: 256px;
}
</style>
