<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <i><img class="logo" src="@/assets/icons/increase.svg"/></i>
      <i class="header-icon el-icon-s-grid"></i>
      <i class="header-icon el-icon-bell"></i>
      <router-link to="/profile">
        <el-avatar class="header-avatar" size="medium">G</el-avatar>
      </router-link>
      <i class="fas fa-sign-out-alt"></i>
    </div>
    <div class="secondary-header flex" />
  </section>
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      loggedInUser: null,
    };
  },
  created() {
    // this.loggedInUser = this.$store.getters.loggedInUser;
  },
  components: {},
};
</script>
