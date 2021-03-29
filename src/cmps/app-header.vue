<template>
  <section class="header-component flex">
    <div class="main-header flex">
      <div class="top-header flex">
        <router-link to="/">
          <i><img
              class="logo"
              src="@/assets/icons/increase.svg"
            /></i>
        </router-link>
        <i
          class="header-icon el-icon-s-grid"
          @click="toggleBoardNavbar"
        ></i>
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
          <i><img
              class="exit"
              src="@/assets/icons/exit.svg"
            /></i>
        </router-link>
      </div>
    </div>
    <div
      class="secondary-header flex "
      :class="{'header-shown': isBoardNavbarShown,'header-not-shown': !isBoardNavbarShown}"
    >
      <ul
        v-if="isBoardNavbarShown"
        class="sidebar-board-prev clean-list"
        v-click-outside="toggleBoardNavbar"
      >
        <li>
          <router-link :to="'/board/' + boardId + '/chart'">
            <i class="el-icon-s-data" />Charts
          </router-link>
        </li>
        <li
          class="add-board flex"
          @click="addNewBoard"
        >
          <i class="el-icon-circle-plus-outline"></i>
          Add
        </li>
        <li class="sidebar-filters flex">
          <i><img
              class="sidebar-board-prev img"
              src="@/assets/icons/filter.svg"
            /></i>
          Filters
        </li>
        <li></li>
        <li class="flex">
          <el-input
            @input="boardToShow()"
            ref="searchInput"
            v-model="filterBy.name"
            class="board-search"
            placeholder="Search a board..."
            prefix-icon="el-icon-search"
          />
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
          <router-link
            class="router-link"
            :to="'/board/' + board._id"
          >
            <h4>{{ board.title }}</h4>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-header-mobile flex-between">
      <div
        class="burger-menu"
        @click="toggleBoardNavbar"
      >☰
      </div>
      <div
        v-if="currBoard"
        class="board-title"
      >{{currBoard.title}}</div>
      <div class="logo-container">
        <router-link to="/">
          <img
            class="logo"
            src="@/assets/icons/increase.svg"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import vClickOutside from "v-click-outside";
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
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isBoardNavbarShown: false,
      board: null,
      filterBy: {
        name: null
      }
    };
  },
  methods: {
    toggleBoardNavbar() {
      this.isBoardNavbarShown = !this.isBoardNavbarShown;
      if (screen.width >= 460) this.$emit('borderRadiusChange');
      if (screen.width <= 460) this.$emit('toggleMainScreen');
    },
    isChosenBoard(id) {
      return this.boardId === id;
    },
    addNewBoard() {
      this.$emit('addingBoard');
    },
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
    boardsToShow() {
      return JSON.parse(JSON.stringify(this.boards));
    },
    boardToShow() {
      this.boardsToShow = this.boards.filter(board => {
        const regex = new RegExp(this.filterBy.name, 'i');
        return !this.filterBy.name || regex.test(board.title)
      });
    },
    currBoard() {
      return this.boards.find(board => board._id === this.boardId)
    }
  },
};
</script>
