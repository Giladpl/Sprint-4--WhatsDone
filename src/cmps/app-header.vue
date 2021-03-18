<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <!-- <section class="top-icon-wrapper flex">  -->
      <i><img src="@/assets/icons/logo.jpg" /></i>
      <i><img src="@/assets/icons/calendar.svg" /></i>
      <i class="header-icon el-icon-s-grid"></i>
      <i class="header-icon el-icon-bell"></i>
      <!-- </section> -->
      <!-- <el-avatar v-if="loggedInUser" class="header-avatar" size="medium" :src="loggedInUser.imgUrl"> -->
      <!-- </el-avatar> -->
      <el-avatar class="header-avatar" size="medium">G</el-avatar>
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
