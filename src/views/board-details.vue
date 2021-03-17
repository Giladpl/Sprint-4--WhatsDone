<template>
  <section
    v-if="board"
    class="board-details"
  >
    <app-header />
    <div class="details-wrapper">
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
      <div
        class="created-by"
        @click="openUserProfile"
      >
        Created By: {{ board.createdBy.fullname }}
      </div>
      <ul class="clean-list">
        <li
          v-for="group in board.groups"
          :key="group._id"
        >
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
      boardToEdit: null,
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
        this.boardToEdit = JSON.parse(JSON.stringify(board))
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    async removeTask({ taskId, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId)
        // const [currTask] = currGroup.tasks.filter(task => task.id == taskId)
        const idx = currGroup.tasks.findIndex(task => task.id === taskId)
        currGroup.tasks.splice(idx, 1)
        this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })
      } catch (err) {

      }



    },
    changeGroupColor(color) {
      console.log(color);
    },
    updateGroupTitle(title) {
      console.log(title);
    },
    async updateBoardTitle(ev) {
      this.boardToEdit.title = ev.target.value
      try {
        this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })
      } catch (err) {

      }
    },
    async updateBoardDescription(ev) {
      this.boardToEdit.description = ev.target.value
      try {
        this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })

      } catch (err) {

      }
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
