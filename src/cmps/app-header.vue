<template>
  <section class="header-component flex">
    <div class="main-header flex">
        <section class="top-icon-wrapper flex"> 
      <i class="header-icon el-icon-s-grid"></i>
      <i class="header-icon el-icon-bell"></i>
        </section>
      <!-- <el-avatar v-if="loggedInUser" class="header-avatar" size="medium" :src="loggedInUser.imgUrl"> -->
      </el-avatar>
      <el-avatar class="header-avatar" size="medium">G</el-avatar>
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
