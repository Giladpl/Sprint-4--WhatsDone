<template>
  <section>
      <div class="top">
          <el-avatar v-if="loggedInUser" class="usr-profile-avatar" size="large" :src="loggedInUser.imgUrl">{{checkLoggedUser}}</el-avatar>
          <el-avatar v-else class="usr-profile-avatar" size="large">{{checkLoggedUser}}</el-avatar>
          <h1 :checkLoggedUser="checkLoggedUser">{{checkLoggedUser}}</h1>
      </div>
  </section>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      loggedInUser: null,
    };
  },
  computed: {
    checkLoggedUser() {
      if (!this.loggedInUser) return "Guest";
      else return this.loggedInUser.fullname;
    },
  },
  created() {
    const user = JSON.parse(this.$store.getters.loggedInUser) || null;
    this.loggedInUser = user || null;
  },
};
</script>

