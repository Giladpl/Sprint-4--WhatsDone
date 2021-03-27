<template>
  <section class="hamburger-main flex" v-click-outside="toggleMenu">
      <ul class="mobile-menu-prev clean-list">
        <li class="add-board-mobile flex" @click="addNewBoard">
          <i class="el-icon-circle-plus-outline"></i>
          Add
        </li>
        <li class="mobile-filters flex">
          <i
            ><img
              class="mobile-menu-prev img"
              src="@/assets/icons/filter.svg"
          /></i>
          Filters
        </li>
        <li></li>
        <li class="flex">
          <el-input  @input="boardToShow()" @click.native.stop="" ref="searchInput" 
             v-model="filterBy.name"  class="mobile-board-search" placeholder="Search a board..." prefix-icon="el-icon-search" />
        </li>
        <li>
          <h4 class="mobile-change-board">Change Board</h4>
        </li>
        <li
          class="mobile-mini-board-prev flex"
          v-for="board in boardsToShow"
          :key="board._id"
          :class="{ 'mobile-chosen-board': isChosenBoard(board._id) }"
        >
          <i class="el-icon-caret-right" />
          <router-link class="router-link" :to="'/board/' + board._id">
            <h4>{{ board.title }}</h4>
          </router-link>
        </li>
      </ul>
  </section>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "mobileHamburger",
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
      board: null,
      boardsToShow: null,
      filterBy: {
        name: null
      }
    };
  },
  methods: {
    // toggleBoardNavbar() {
    //   this.isBoardNavbarShown = !this.isBoardNavbarShown;
    //   this.$emit("borderRadiusChange");
    // },
    isChosenBoard(id) {
      return this.boardId === id;
    },
    addNewBoard() {
      this.$emit('addingBoard');
    },
    toggleMenu() {
      this.$emit('toggleMenu');
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
    currBoard() {
      return this.boards.find(board => board._id === this.boardId)
    }
  },
  created() {
      this.boardsToShow = JSON.parse(JSON.stringify(this.boards));
  },
  components: {
  },
};
</script>

