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
          <el-avatar
            class="header-avatar"
            size="medium"
            :src="loggedInUser.imgUrl"
          ></el-avatar>
        </router-link>
        <router-link to="/">
          <i><img class="exit" src="@/assets/icons/exit.svg" /></i>
        </router-link>
      </div>
    </div>
    <div
      class="secondary-header flex"
      :class="{'header-shown': isBoardNavbarShown,'header-not-shown': !isBoardNavbarShown}">
      <ul v-if="isBoardNavbarShown" class="sidebar-board-prev clean-list">
        <li class="add-board flex" @click="addNewBoard">
          <i class="el-icon-circle-plus-outline"></i>
          Add
        </li>
        <li class="sidebar-filters flex">
          <i
            ><img
              class="sidebar-board-prev img"
              src="@/assets/icons/filter.svg"
          /></i>
          Filters
        </li>
        <li></li>
        <li class="flex">
          <el-input  @input="boardToShow()" @click.native.stop="" ref="searchInput" 
             v-model="filterBy.name"  class="board-search" placeholder="Search a board..." prefix-icon="el-icon-search" />
        </li>
        <li>
          <h4 class="change-board">Change Board</h4>
        </li>
        <li
          class="mini-board-prev flex"
          v-for="board in boardsToShow"
          :key="board._id"
          :class="{ 'chosen-board': isChosenBoard(board._id) }"
        >
          <i class="el-icon-caret-right" />
          <router-link class="router-link" :to="'/board/' + board._id">
            <h4>{{ board.title }}</h4>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
// import vClickOutside from "v-click-outside";
export default {
  name: "appHeader",
  props: {
    boards: {
      type: Array,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  directives: {
    // clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isBoardNavbarShown: false,
      board: null,
      boardsToShow: null,
      filterBy: {
        name: null
      }
    };
  },
  methods: {
    toggleBoardNavbar() {
      this.isBoardNavbarShown = !this.isBoardNavbarShown;
      this.$emit("brdrRadiusChange");
    },
    isChosenBoard(id) {
      return this.boardId === id;
    },
    addNewBoard() {
      this.$emit('addingBoard');
    }
  },
  computed: {
    loggedInUser() {
      let user = this.$store.getters.loggedInUser;
      if (!user) {
        user = {
          _id: "guest",
          fullname: "Guest",
          imgUrl:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        };
      }
      return user;
    },
    boardToShow() {
      this.boardsToShow = this.boards.filter(board => {
        const regex = new RegExp(this.filterBy.name, 'i');
        return !this.filterBy.name || regex.test(board.title)
      });
    },
  },
  // watch: {
  //   // board: {
  //   //   deep: true,
  //   //   handler() {
  //   //     this.loadBoard();
  //   //   },
  //   // },
  // },
  created() {
      this.boardsToShow = JSON.parse(JSON.stringify(this.boards));
    // this.loggedInUser = this.$store.getters.loggedInUser;
  },
  components: {
  },
};
</script>
