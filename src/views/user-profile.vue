<template>
  <section class="user-profile-main-container flex">
    <app-header :boards="boards"/>
    <div class="profile-container">
      <div class="top">
        <el-avatar
          class="usr-profile-avatar"
          size="large"
          :src="loggedInUser.imgUrl"
        >
        </el-avatar>
        <h1>{{ loggedInUser.fullname }}</h1>
      </div>
      <div v-if="isGuest" class="bottom-guest">
        <div>Click for signup</div>
        <router-link to="/login">SignUp</router-link>
      </div>
      <div v-if="!isGuest" class="bottom">
        <div class="user-boards">
          <h2>My boards</h2>
          <h3>Board 1</h3>
          <h3>Board 2</h3>
          <h3>Board 3</h3>
        </div>
        <div class="user-tasks">
          <h2>My Tasks</h2>
          <h3>Task 1</h3>
          <h3>Task 2</h3>
          <h3>Task 3</h3>
        </div>
        <div class="user-details">
          <el-avatar
            class="usr-profile-avatar"
            size="large"
            :src="loggedInUser.imgUrl"
          >
          </el-avatar>
          <div class="user-details-username flex">
            <i class="el-icon-user-solid"></i>
            <h3><span>username:</span> guestus</h3>
          </div>
          <div class="user-details-email flex">
            <i class="el-icon-message"></i>
            <h3><span>email:</span> guestus@gmail.com</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "../cmps/app-header.vue";

export default {
  components: { appHeader },
  name: "user-profile",
  data() {
    return {
      isGuest: false
    };
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    loggedInUser() {
      let user = this.$store.getters.loggedInUser;
      if (!user) {
        this.isGuest = true;
        user = {
          _id: 'guest',
          fullname: 'Guest',
          imgUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        }
      }
      return user;
    }
  }
};
</script>

