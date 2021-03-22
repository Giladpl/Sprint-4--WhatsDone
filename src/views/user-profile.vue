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
      <div v-if="isGuest" class="bottom-guest flex-center">
        <div>Hello, Friend!</div>   
        <div>Enter your personal details and start your journey with us</div>
        <el-button class="signup-btn"><router-link class="router-link" to="/login">Sign Up</router-link></el-button>
      </div>
      <div v-if="!isGuest" class="bottom">
        <div v-if="userBoards" class="user-boards">
          <h2>My boards</h2>
          <div v-for="board in userBoards" :key="board._id">
            <h4>{{board.title}}</h4>
          </div>
        </div>
        <div v-if="userTasks" class="user-tasks">
          <h2>My Tasks</h2>
          <div v-for="task in userTasks" :key="task.id">
            <h4>{{task.title}}</h4>
          </div>
        </div>
        <!-- <div class="user-details">
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
        </div> -->
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
      isGuest: false,
      boards: null,
    };
  },
  computed: {
    userBoards() {
      return this.boards.filter(board => board.createdBy._id === this.loggedInUser._id) 
    },
    userTasks() {
      let tasks = []
      this.boards.forEach(board => {
        board.groups.forEach(group => {
          let miniTasks = group.tasks.filter(task => task.byMember._id === this.loggedInUser._id);
          tasks.push(...miniTasks);
        })
      });
      return tasks;
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
  },
  created() {
    this.boards = this.$store.getters.boards
  }
};
</script>

