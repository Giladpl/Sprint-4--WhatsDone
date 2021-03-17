<template>
  <section v-if="board" class="board-details">
    <app-header />
    <div class="detail-wrapper">
      <div>
        <input
          class="board-title-input"
          v-if="boardTitle"
          type="text"
          @input="updateBoardTitle"
          v-model="boardTitle"
        />
      </div>
      <div>
        <input
          class="board-description-input"
          v-if="boardDescription"
          type="text"
          @input="updateBoardDescription"
          v-model="boardDescription"
        />
      </div>
      <div class="created-by" @click="openUserProfile">
        Created By: {{ board.createdBy.fullname }}
      </div>
      <ul class="clean-list">
        <li v-for="group in board.groups" :key="group._id">
          <group
            :group="group"
            @changeColor="changeGroupColor"
            @updateTitle="updateGroupTitle"
            @removeTask="removeTask"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board.service.js";
import group from "@/cmps/group";
import appHeader from "@/cmps/app-header";

export default {
  data() {
    return {
      board: null,
      boardTitle: null,
      boardDescription: null,
    };
  },
  methods: {
    async loadBoard() {
      try {
        const id = this.$route.params.boardId;
        const board = await boardService.getById(id);
        this.board = board;
        this.boardTitle = board.title;
        this.boardDescription = board.description;
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    async removeTask(taskId) {
      console.log(taskId);
    },
    changeGroupColor(color) {
      console.log(color);
    },
    updateGroupTitle(title) {
      console.log(title);
    },
    updateBoardTitle(ev) {
      console.log(ev.target.value);
    },
    updateBoardDescription(ev) {
      console.log(ev.target.value);
    },
    openUserProfile() {
      console.log("open user profile");
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  created() {
    this.loadBoard();
  },
  components: {
    group,
    appHeader,
  },
};
</script>
