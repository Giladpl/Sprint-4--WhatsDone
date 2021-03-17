<template>
  <section
    v-if="board"
    class="board-details"
  >
    <input
        class="board-title-input"
        v-if="boardTitle"
        type="text"
        @input="updateBoardTitle"
        v-model="boardTitle"
    >
    <div>{{board.description}}</div>
    <div>Created By: {{board.createdBy.fullname}}</div>
    <ul class="clean-list">
      <li
        v-for="group in board.groups"
        :key="group._id"
      >
        <group
          :group="group"
          @changeColor="changeGroupColor"
					@updateTitle="updateGroupTitle"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import group from '@/cmps/group';

export default {
  data() {
    return {
      board: null,
      boardTitle: null
    };
  },
  methods: {
    async loadBoard() {
      try {
        const id = this.$route.params.boardId;
        const board = await boardService.getById(id)
        this.board = board;
        this.boardTitle = board.title;
      } catch (err) {
        console.log('cannot load board', err);
      }
    },
    changeGroupColor(color) {
      console.log(color);

    },
		updateGroupTitle(title) {
			console.log(title);
		},
    updateBoardTitle(title) {
      console.log(title);
    }
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
    group
  }
};
</script>
