<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <div class="top-header flex">
        <i><img class="logo" src="@/assets/icons/increase.svg"/></i>
        <i class="header-icon el-icon-s-grid"></i>
        <i class="header-icon el-icon-bell"></i>
      </div>
      <div class="bottom-header flex">
        <router-link to="/profile">
          <el-avatar class="header-avatar" size="medium">G</el-avatar>
        </router-link>
        <i><img class="exit" src="@/assets/icons/exit.svg"/></i>
      </div>
    </div>
    <!-- <div class="secondary-header flex" /> -->
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
