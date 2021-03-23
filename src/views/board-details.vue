<template>
  <section
    v-if="board && boardToEdit"
    class="board-details"
    :style="isFixed"
  >
    <div :class="classObjectScreen"></div>
    <app-header :boardId="board._id" :boards="boards" @brdrRadiusChange="changeBrderRadius" 
        @addBoard="addNewBoard" @addingboard="addNewBoard"/>
      
    <div
      class="details-wrapper"
      :class="{'no-brdr-radius' : isBrdrRadius}"
    >
      <div class="board-static-header">
        <div class="board-top-row flex-between">
          <input class="board-title-input" type="text" @change="updateBoardTitle" 
            v-model="boardToEdit.title" />
          <div class="board-btns flex-between">
            <board-member-avatar
              :board="board"
              :members="board.members"
            />
            <div>Activity</div>
            <div>
              <el-button
                class="add-btn"
                size="mini"
              >+Add to board</el-button>
            </div>
            <div class="more-btn"><i class="el-icon-more"></i></div>
          </div>
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
          <router-link
            class="router-link board-creator"
            to="/profile"
          >
            Created By: {{ board.createdBy.fullname }}
          </router-link>
        </div>
        <div class="add-view-row-container">
          <el-button
            @click="toggleAddViewMenu"
            class="add-view-btn"
            size="small"
          >
            + Add View
          </el-button>
        </div>
        <div
          v-click-outside="toggleAddViewMenu"
          v-if="isAddViewMenu"
          class="add-view-card"
        >
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/table.svg"
            />
            Table
          </div>
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/calendar.svg"
            />
            Calander
          </div>
          <div>
            <img
              class="btn-add-view-menu"
              src="@/assets/icons/chart.svg"
            />
            Chart
          </div>
        </div>
      </div>

      <el-button
        @click="addGroup"
        class="btn-add-group"
        type="primary"
        size="small"
      >
        Add Group
      </el-button>

      <draggable
        class="clean-list"
        v-model="board.groups"
        @start="drag = true"
        @end="drag = false"
        @change="changedByDrag"
      >
        <li
          v-for="group in board.groups"
          :key="group._id"
        >
          <group
            :group="group"
            :statuses="board.statuses"
            :priorities="board.priorities"
            :boardMembers="board.members"
            :activities="board.activities"
            :isStopWatch="isStopWatch"
            @changeColor="changeGroupColor"
            @updateTitle="updateGroupTitle"
            @removeTask="removeTask"
            @removeGroup="removeGroup"
            @addTask="addTask"
            @updateDueDate="updateDueDate"
            @removeMemberFromTask="removeMemberFromTask"
            @addMemberToTask="addMemberToTask"
            @updateStatus="updateStatus"
            @addStatus="addStatus"
            @removeStatus="removeStatus"
            @updatePriority="updatePriority"
            @addPriority="addPriority"
            @removePriority="removePriority"
            @updateTaskTitle="updateTaskTitle"
            @updateTasksOrder="updateTasksOrder"
            @addUpdate="addUpdate"
            @toggleMainScreen="toggleMainScreen"
            @addTimeToTask="addTimeToTask"
            @toggleStopwatch="toggleStopwatch"
          />
        </li>
      </draggable>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board.service.js";
import group from "@/cmps/group";
import appHeader from "@/cmps/app-header";
import boardMemberAvatar from "@/cmps/board-member-avatar";
import { utilService } from "../services/util.service.js";
import vClickOutside from "v-click-outside";
import draggable from "vuedraggable";

export default {
  name: 'board-details',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      boardToEdit: null,
      isAddViewMenu: false,
      isMainScreen: false,
      isBrdrRadius: false,
      isStopWatch: false,
    };
  },
  methods: {
    async loadBoard() {
      try {
        const boardId = this.$route.params.boardId;
        await this.$store.dispatch({ type: 'loadBoard', boardId });
        // console.log('store', this.board );
        this.boardToEdit = JSON.parse(JSON.stringify(this.board));
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    

    toggleStopwatch() {
      this.isStopWatch = !this.isStopWatch;
    },
    openUserProfile() {
      console.log("open user profile");
    },
    toggleAddViewMenu() {
      this.isAddViewMenu = !this.isAddViewMenu;
    },
    toggleMainScreen() {
      this.isMainScreen = !this.isMainScreen;
    },
    changeBrderRadius() {
      this.isBrdrRadius = !this.isBrdrRadius;
    },
    addActivity(action, task) {
      const activity = {
        id: utilService.makeId(),
        action,
        createdAt: Date.now(),
        byMember: {
          _id: "",
          fullname: "",
          imgUrl: "",
        },
        task: {
          id: task.id,
          title: task.title,
        },
      };
      if (this.loggedinUser) {
        activity.byMember._id = this.loggedinUser._id;
        activity.byMember.fullname = this.loggedinUser.fullname;
        activity.byMember.imgUrl = this.loggedinUser.imgUrl;
      } else {
        activity.byMember._id = 'guest';
        activity.byMember.fullname = 'Guest';
        activity.byMember.imgUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
      }
      this.boardToEdit.activities.push(activity);
    },
    removeTask({ taskId, groupId }) {
      this.$confirm(
        "This will permanently delete the task. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          const [currGroup] = this.boardToEdit.groups.filter(
            (group) => group.id === groupId
          );
          const idx = currGroup.tasks.findIndex((task) => task.id === taskId);
          const currTask = currGroup.tasks.find((task) => task.id === taskId);
          this.addActivity("Remove task", currTask);
          currGroup.tasks.splice(idx, 1);
          this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        })
        .then(() => this.loadBoard())
        .catch(() => console.log("Could not remove task"));
    },
    removeGroup({ groupId }) {
      this.$confirm(
        "This will permanently delete the group. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          const groupIdx = this.boardToEdit.groups.findIndex(
            (group) => group.id === groupId
          );
          this.boardToEdit.groups.splice(groupIdx, 1);
          this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        })
        .then(() => this.loadBoard())
        .catch(() => console.log("Could not remove group"));
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
      } catch (err) {
        console.log("cannot update board title", err);
      }
    },
    async addNewBoard() {
    try {
        const boardToAdd = boardService.getEmptyBoard();
        await this.$store.dispatch({ type: "saveBoard", board: boardToAdd });
        this.loadBoard();
        this.$router.push(`/board/${boardToAdd._id}`);
      } catch (err) {
        console.log(err);
      }
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
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupUpdate.groupId);
        currGroup.title = groupUpdate.title;
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update group title", err);
      }
    },
    async addTask({ taskTitle, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId);
        const taskToAdd = boardService.getEmptyTask();
        taskToAdd.title = taskTitle;
        currGroup.tasks.push(taskToAdd);
        this.addActivity("Add task", taskToAdd);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup() {
      try {
        const groupToAdd = boardService.getEmptyGroup();
        this.boardToEdit.groups.push(groupToAdd);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add group", err);
      }
    },
    async updateDueDate(update) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === update.groupId);
        const idx = currGroup.tasks.findIndex(task => task.id === update.taskId);
        currGroup.tasks[idx].dueDate = update.date;
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update due date", err);
      }
    },
    async removeMemberFromTask(update) {
      try {
        const currGroupIdx = this.boardToEdit.groups.findIndex(group => group.id === update.groupId);
        const currTaskIdx = this.boardToEdit.groups[currGroupIdx].tasks.findIndex((task) => task.id === update.taskId);
        const currTask = this.boardToEdit.groups[currGroupIdx].tasks[currTaskIdx];
        const memberToRemoveIdx = currTask.members.findIndex(member => member._id === update.taskMember._id);
        const taskMembersShortcut = currTask.members;
        taskMembersShortcut.splice(memberToRemoveIdx, 1);
        this.addActivity("Remove member", currTask);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot remove member", err);
      }
    },
    async addMemberToTask(update) {
      try {
        const currGroupIdx = this.boardToEdit.groups.findIndex(group => group.id === update.groupId);
        const currTaskIdx = this.boardToEdit.groups[currGroupIdx].tasks.findIndex((task) => task.id === update.taskId);
        const taskShortcut = this.boardToEdit.groups[currGroupIdx].tasks[currTaskIdx];
        taskShortcut.members.push(update.member);
        this.addActivity("Add member", taskShortcut);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add member", err);
      }
    },
    async updateStatus(update) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === update.groupId);
        const idx = currGroup.tasks.findIndex(task => task.id === update.taskId);
        currGroup.tasks[idx].statusId = update.statusId;
        this.addActivity("Update status", currGroup.tasks[idx]);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update status", err);
      }
    },
    async addStatus(newStatus) {
      try {
        newStatus.id = utilService.makeId();
        this.boardToEdit.statuses.push(newStatus);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add status", err);
      }
    },
    async removeStatus(statusId) {
      try {
        const statusIdx = this.boardToEdit.statuses.findIndex(status => status.id === statusId);
        this.boardToEdit.statuses.splice(statusIdx, 1);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot remove status", err);
      }
    },
    async updatePriority(update) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === update.groupId);
        const idx = currGroup.tasks.findIndex(task => task.id === update.taskId);
        currGroup.tasks[idx].priorityId = update.priorityId;
        this.addActivity("Update priority", currGroup.tasks[idx]);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update priority", err);
      }
    },
    async addPriority(newPriority) {
      try {
        newPriority.id = utilService.makeId();
        this.boardToEdit.priorities.push(newPriority);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add priority", err);
      }
    },
    async removePriority(priorityId) {
      try {
        const priorityIdx = this.boardToEdit.priorities.findIndex(priority => priority.id === priorityId);
        this.boardToEdit.priorities.splice(priorityIdx, 1);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot remove priority", err);
      }
    },
    async updateTaskTitle({ updatedTitle, taskId, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId);
        const taskIdx = currGroup.tasks.findIndex((task) => task.id === taskId);
        this.addActivity("Update task title", currGroup.tasks[taskIdx]);
        currGroup.tasks[taskIdx].title = updatedTitle;
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update task", err);
      }
    },
    async updateTasksOrder({ tasks, groupId }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId);
        currGroup.tasks.splice(0, currGroup.tasks.length, ...tasks);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async addUpdate(update) {
      try {
        if (this.loggedinUser) {
          update.comment.byMember = {
            _id: this.loggedinUser._id,
            fullname: this.loggedinUser.fullname,
            imgUrl: this.loggedinUser.imgUrl,
          };
        } else {
          update.comment.byMember = {
            _id: 'guest',
            fullname: 'Guest',
            imgUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          };
        }
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === update.groupId);
        const idx = currGroup.tasks.findIndex(task => task.id === update.taskId);
        currGroup.tasks[idx].comments.push(update.comment);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add update", err);
      }
    },
    async changedByDrag() {
      try {
        this.boardToEdit.groups.splice(0, this.boardToEdit.groups.length, ...this.board.groups);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async addTimeToTask({ groupId, taskId, totalSeconds }) {
      try {
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === groupId);
        const taskIdx = currGroup.tasks.findIndex((task) => task.id === taskId);
        this.addActivity("Update time worked on task", currGroup.tasks[taskIdx]);
        currGroup.tasks[taskIdx].secondsWorkedOn = totalSeconds;
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update time worked on task", err);
      }
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedInUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
    board() {
      return this.$store.getters.currBoard;
    },
    classObjectScreen() {
      return {
        'main-screen': this.isMainScreen,
        'main-screen-hidden': !this.isMainScreen,
      }
    },
    isFixed() {
      return this.isMainScreen ? 'position: fixed' : ''
    }
  },
  watch: {
    "$route.params.boardId"() {
      this.loadBoard();
    },
    // board: {
    //   deep: true,
    //   handler() {
    //     this.loadBoard();
    //   },
    // },
  },
  created() {
    this.loadBoard();
  },
  components: {
    group,
    appHeader,
    boardMemberAvatar,
    draggable,
  },
};
</script>