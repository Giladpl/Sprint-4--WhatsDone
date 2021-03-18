<template>
  <section
    v-if="boardToEdit"
    class="board-details"
  >
    <app-header />
    <div class="details-wrapper">
      <div>
        <input
          class="board-title-input"
          type="text"
          @change="updateBoardTitle"
          v-model="boardToEdit.title"
        />
      </div>
      <div>
        <input
          class="board-description-input"
          type="text"
          @change="updateBoardDescription"
          v-model="boardToEdit.description"
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
      boardToEdit: null,
    };
  },
  methods: {
    async loadBoard() {
      try {
        const id = this.$route.params.boardId;
        const board = await boardService.getById(id);
        this.board = board;
        this.boardToEdit = JSON.parse(JSON.stringify(board))
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    async removeTask({ taskId, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId)
        const idx = currGroup.tasks.findIndex(task => task.id === taskId)
        currGroup.tasks.splice(idx, 1)
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })
        thie.loadBoard()

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
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })
        this.loadBoard()
      } catch (err) {

      }
    },
    async updateBoardDescription(ev) {
      this.boardToEdit.description = ev.target.value
      try {
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit })
        this.loadBoard()
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
