<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <div class="top-header flex">
        <router-link to="/">
          <i><img class="logo" src="@/assets/icons/increase.svg"/></i>
        </router-link>
        <i class="header-icon el-icon-s-grid" @click="toggleBoardNavbar"></i>
        <i class="header-icon el-icon-bell"></i>
      </div>
      <div class="bottom-header flex">
        <router-link to="/profile">
          <el-avatar class="header-avatar" size="medium">G</el-avatar>
        </router-link>
        <router-link to="/">
          <i><img class="exit" src="@/assets/icons/exit.svg"/></i>
        </router-link>
      </div>
    </div>
    <div class="secondary-header flex" :class="{'header-shown': isBoardNavbarShown, 'header-not-shown': !isBoardNavbarShown}" />
  </section>
</template>

<script>
export default {
  name: "appHeader",
  data() {
    return {
      loggedInUser: null,
      isBoardNavbarShown: false,
    };
  },
  methods: {
    toggleBoardNavbar() {
      this.isBoardNavbarShown = !this.isBoardNavbarShown;
    }
  },
  created() {
    // this.loggedInUser = this.$store.getters.loggedInUser;
  }
};
</script>
