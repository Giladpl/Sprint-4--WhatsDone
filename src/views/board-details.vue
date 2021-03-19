<template>
  <section v-if="boardToEdit" class="board-details">
    <app-header />
    <div class="details-wrapper">
      <div class="board-static-header">
        <div class="board-top-row">
          <input
            class="board-title-input"
            type="text"
            @change="updateBoardTitle"
            v-model="boardToEdit.title"
          />
          <users-avatars :board="board" :members="board.members" />
        </div>
        <div>
          <input
            class="board-description-input"
            type="text"
            @change="updateBoardDescription"
            v-model="boardToEdit.description"
          />
        </div>
        <div class="created-by" @click="openUserProfile">
          <router-link to="/profile">
            Created By: {{ board.createdBy.fullname }}
          </router-link>
        </div>
        <div class="add-view-row-container">
          <el-button @click="toggleAddViewMenu" class="add-view-btn"
            >+ Add View</el-button
          >
        </div>
        <el-card v-if="isAddViewMenu" class="add-view-card" shadow="always">
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/table.svg"
            />Table
          </div>
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/calendar.svg"
            />Calander
          </div>
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/chart.svg"
            />Chart
          </div>
        </el-card>
      </div>

      <el-button @click="addGroup" class="btn-add-group" type="primary"
        >Add Group</el-button
      >
      <ul class="clean-list">
        <li v-for="group in board.groups" :key="group._id">
          <group
            :group="group"
            :statuses="board.statuses"
            :priorities="board.priorities"
            :boardMembers="board.members"
            @changeColor="changeGroupColor"
            @updateTitle="updateGroupTitle"
            @removeTask="removeTask"
            @removeGroup="removeGroup"
            @addTask="addTask"
            @updateDueDate="updateDueDate"
            @removeMemberFromTask="removeMemberFromTask"
            @addMemberToTask="addMemberToTask"
            @updateStatus="updateStatus"
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
import usersAvatars from "@/cmps/users-avatars";

export default {
  data() {
    return {
      board: null,
      boardToEdit: null,
      isAddViewMenu: false,
    };
  },
  methods: {
    async loadBoard() {
      try {
        const id = this.$route.params.boardId;
        const board = await boardService.getById(id);
        this.board = board;
        this.boardToEdit = JSON.parse(JSON.stringify(board));
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    async removeTask({ taskId, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === groupId
        );
        const idx = currGroup.tasks.findIndex((task) => task.id === taskId);
        currGroup.tasks.splice(idx, 1);
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log("cannot remove task", err);
      }
    },
    async removeGroup({ groupId }) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (group) => group.id === groupId
        );
        this.boardToEdit.groups.splice(groupIdx, 1);
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {}
    },
    async changeGroupColor(groupUpdate) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === groupUpdate.groupId
        );
        currGroup.color = groupUpdate.chosenColor;
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update group color", err);
      }
    },
    async updateBoardTitle(ev) {
      this.boardToEdit.title = ev.target.value;
      try {
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {}
    },
    async updateBoardDescription(ev) {
      this.boardToEdit.description = ev.target.value;
      try {
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update board description", err);
      }
    },
    async updateGroupTitle(groupUpdate) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === groupUpdate.groupId
        );
        currGroup.title = groupUpdate.title;
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update group title", err);
      }
    },
    async addTask({ taskTitle, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === groupId
        );
        const taskToAdd = boardService.getEmptyTask();
        taskToAdd.title = taskTitle;
        currGroup.tasks.push(taskToAdd);
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup() {
      try {
        const groupToAdd = boardService.getEmptyGroup();
        this.boardToEdit.groups.push(groupToAdd);
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async updateDueDate(update) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === update.groupId
        );
        const idx = currGroup.tasks.findIndex(
          (task) => task.id === update.taskId
        );
        currGroup.tasks[idx].dueDate = update.date;
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update due date", err);
      }
    },
    openUserProfile() {
      console.log("open user profile");
    },
    toggleAddViewMenu() {
      this.isAddViewMenu = !this.isAddViewMenu;
    },
    // async removeMemberFromTask(update) {
    //   // this.$emit('removeMemberFromTask', taskMember, taskId);
    //   try {
    //     const groupToAdd = boardService.getEmptyGroup();
    //     this.boardToEdit.groups.push(groupToAdd);
    //     await this.$store.dispatch({
    //       type: "saveBoard",
    //       board: this.boardToEdit,
    //     });
    //     this.loadBoard();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
   async addMemberToTask(update) {
      // this.$emit('addMemberToTask', taskMember, taskId);
      try {

        const currGroupIdx =  this.boardToEdit.groups.findIndex(group => {
          return group.id === update.groupId;
        });
        const currTaskIdx =  this.boardToEdit.groups.tasks.findIndex(task => {
          return task.id === update.taskId;
        });
        const memberToRemoveIdx = this.boardToEdit.groups.members.findindex(member => {
          return member._id === update.memberId;
        });

        const tasksShortCut = this.boardToEdit.groups.tasks;
        tasksShortCut[currTaskIdx].mambers.push(taskMember);
        tasksShortCut.splice(taskMember);
        await this.$store.dispatch({
          type: "saveBoard",
          board: this.boardToEdit,
        });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async updateStatus(update) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(
          (group) => group.id === update.groupId
        );
        const idx = currGroup.tasks.findIndex(
          (task) => task.id === update.taskId
        );
        currGroup.tasks[idx].statusId = update.statusId;
        await this.$store.dispatch({type: "saveBoard", board: this.boardToEdit});
        this.loadBoard();
      } catch (err) {
        console.log("cannot update status", err);
      }
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
    group,
    appHeader,
    usersAvatars,
  },
};
</script>
