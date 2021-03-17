<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <i class="el-icon-s-grid"></i>
      <el-avatar
        v-if="loggedInUser"
        class="header-avatar"
        size="medium"
        :src="loggedInUser.imgUrl"
      >
      </el-avatar>
      <el-avatar class="header-avatar" v-else size="medium">G</el-avatar>
    </div>
    <div class="secondary-header flex"/>
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
    this.$store.getters.loggedInUser = this.loggedInUser;
  },
};
</script>
