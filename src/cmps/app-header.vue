<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <div class="top-header flex">
        <router-link to="/">
          <i><img class="logo" src="@/assets/icons/increase.svg" /></i>
        </router-link>
        <i class="header-icon el-icon-s-grid" @click="toggleBoardNavbar"></i>
        <i class="header-icon el-icon-bell"></i>
      </div>
      <div class="bottom-header flex">
        <router-link to="/profile">
          <el-avatar class="header-avatar" size="medium">G</el-avatar>
        </router-link>
        <router-link to="/">
          <i><img class="exit" src="@/assets/icons/exit.svg" /></i>
        </router-link>
      </div>
    </div>
    <div class="secondary-header flex" :class="{'header-shown': isBoardNavbarShown, 
        'header-not-shown': !isBoardNavbarShown,}">
      <ul v-if="isBoardNavbarShown" class="sidebar-board-prev clean-list">
        <li><h4 class="change-board">Change Board</h4></li>
        <li class="mini-board-prev" v-for="board in boards" :key="board._id">
         <h4>{{ board.title }}</h4>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import boardList from "./board-list.vue";
export default {
  name: "appHeader",
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loggedInUser: null,
      isBoardNavbarShown: false,
    };
  },
  methods: {
    toggleBoardNavbar() {
      this.isBoardNavbarShown = !this.isBoardNavbarShown;
    },
  },
  created() {
    // this.loggedInUser = this.$store.getters.loggedInUser;
  },
  components: { boardList },
};
</script>
