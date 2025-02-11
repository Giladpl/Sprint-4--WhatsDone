<template>
  <section
    v-if="board && boardToEdit"
    class="board-details"
    :style="isFixed"
  >
    <div :class="classObjectScreen"></div>

    <div
      v-if="isBoardActivity"
      class="board-activity"
    >
      <div class="flex"><i
          class="el-icon-close close-btn"
          @click="toggleBoardActivity"
        ></i>
        <h3 class="activities-title">Board Activities</h3>
      </div>

      <task-activity
        :activities="boardToEdit.activities"
        v-click-outside="toggleBoardActivity"
      />
    </div>

    <app-header
      :boardId="board._id"
      :boards="boards"
      @borderRadiusChange="changeBorderRadius"
      @addingBoard="addNewBoard"
      @toggleMainScreen="toggleMainScreen"
       @toggleAddView="toggleAddView"
    />
    <div class="triangle-dent-header"></div>
    <div
      class="details-wrapper"
      :class="{'no-border-radius' : isBorderRadius}"
    >
      <div class="board-static-header">
        <div class="board-top-row flex-between">
          <input
            class="board-title-input"
            type="text"
            @change="updateBoardTitle"
            v-model="boardToEdit.title"
          />
          <div class="board-btns flex-between">
            <router-link to="/profile">
              <el-avatar
                class="header-avatar"
                size="medium"
                :src="loggedInUser.imgUrl"
              ></el-avatar>
            </router-link>
            <board-member-avatar
              :board="board"
              :members="board.members"
            />
            <div
              @click="toggleBoardActivity"
              class="flex"
            >
              <img
                class="activity-img"
                src="@/assets/icons/arrow.jpeg"
              >
              Activity
            </div>
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
        <div class="buttons-row-container flex">
          <el-button
            @click="toggleAddViewMenu"
            class="add-view-btn"
            size="small"
          >
            + Add View
          </el-button>
          <div class="flex-center">
            <div class="btn-integrate">
              <img src="@/assets/icons/plug.svg">
              Integrate
              <img src="@/assets/icons/slack.svg">
              <img src="@/assets/icons/gmail.svg">
            </div>
            <div class="btn-automate"><img src="@/assets/icons/robot.svg">Automate</div>
          </div>
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
          <div class="chart-btn">
            <router-link
              class="chart-btn"
              :to="'/board/' + board._id + '/chart'"
              @click.native="toggleAddView"
            >
              <div>
                <img
                  class="btn-add-view-menu"
                  src="@/assets/icons/chart.svg"
                />
                Chart
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="filters-container"
        v-if="!isView"
      >
        <el-button
          v-if="!isView"
          @click="addGroup"
          class="btn-add-group"
          type="primary"
          size="small"
        >
          Add Group
        </el-button>
        <el-input
          class="task-search"
          placeholder="Search"
          prefix-icon="el-icon-search"
          v-model="filterBy.txt"
        />
        <!-- <img
            class="select-filter img"
            src="@/assets/icons/filter.svg"
          /> -->
        <el-select 
          class="select-filter"
          multiple
          collapse-tags
          v-model="filterBy.members"
          placeholder="Filter"
        >
          <el-option
            v-for="member in board.members"
            :key="member._id"
            :value="member._id"
            :label="member.fullname"
          >
          </el-option>
        </el-select>
        <div><i class="el-icon-sort">Sort</i></div>
        <img src="@/assets/icons/push-pin.svg">
        <img src="@/assets/icons/restriction.svg">
        <img src="@/assets/icons/fill.svg">
        <img src="@/assets/icons/pen.svg">
      </div>
      <router-view
        v-if="isView"
        @toggleAddView="toggleAddView"
      />
      <draggable
        v-if="!isView"
        class="clean-list"
        v-model="boardToEdit.groups"
        @start="drag = true"
        @end="drag = false"
        @change="changeGroupByDrag"
        :scroll-sensitivity="250"
        :force-fallback="true"
        :animation="400"
        :disabled="!isDragEnabled"
        handle=".handle"
        drag-class="dragging-item"
        chosen-class="chosen-item"
        ghost-class="ghost-item"
        :delay="100"
      >
        <li
          v-for="group in groupsToShow"
          :key="group._id"
        ><span class="handle">&vellip;&vellip;</span>
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
      <el-button
        type="text"
        v-if="isAddingBoard"
      ></el-button>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board.service.js";
import group from "@/cmps/group";
import appHeader from "@/cmps/app-header";
import boardMemberAvatar from "@/cmps/board-member-avatar";
import taskActivity from "@/cmps/task-activity";
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
      isBorderRadius: false,
      isStopWatch: false,
      isView: false,
      isAddingBoard: false,
      currUser: null,
      isDragEnabled: true,
      isBoardActivity: false,
      filterBy: {
        txt: '',
        members: []
      }
    };
  },
  methods: {
    async loadBoard() {
      try {
        if (this.boardToEdit) socketService.emit('board-updated', this.boardToEdit);
        const boardId = this.$route.params.boardId;
        await this.$store.dispatch({ type: 'loadBoard', boardId });
        this.boardToEdit = JSON.parse(JSON.stringify(this.board));
      } catch (err) {
        console.log("cannot load board", err);
      }
    },
    toggleBoardActivity() {
      this.isBoardActivity = !this.isBoardActivity
      this.toggleMainScreen()
    },
    toggleAddView() {
      this.isView = !this.isView
      this.isAddViewMenu = false
      // this.$router.push(`/board/ + ${this.boardToEdit._id} + /chart`);
    //  "'/board/' + boardId + '/chart'"
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
      this.toggleDragging()
    },
    changeBorderRadius() {
      this.isBorderRadius = !this.isBorderRadius;
    },
    toggleDragging() {
      this.isDragEnabled = !this.isDragEnabled;
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
      activity.byMember = this.loggedInUser;
      this.boardToEdit.activities.push(activity);
    },
    removeTask({ taskId, groupId }) {
      this.$confirm(
        "It will be removed permanently.",
        "Remove this task?",
        {
          confirmButtonText: "Delete",
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
        "This will permanently delete the group.",
        "Delete this group?",
        {
          confirmButtonText: "Delete",
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
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update group color", err);
      }
    },
    async updateBoardTitle(ev) {
      this.boardToEdit.title = ev.target.value;
      try {
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot update board title", err);
      }
    },
    addNewBoard() {
      this.isAddingBoard = true;
      let boardToAdd = boardService.getEmptyBoard();
      this.$prompt('Insert a board title', '', { confirmButtonText: 'OK', cancelButtonText: 'Cancel' })
        .then(({ value }) => boardToAdd.title = value)
        .then(() => this.$store.dispatch({ type: "saveBoard", board: boardToAdd }))
        .then(() => {
          this.loadBoard()
          this.$router.push(`/board/${boardToAdd._id}`)
        })
        .catch(err => console.log('No name was saved or object had error while saving in to DB', err))
    },
    async updateBoardDescription(ev) {
      this.boardToEdit.description = ev.target.value;
      try {
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
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
        this.boardToEdit.groups.unshift(groupToAdd);
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
        this.boardToEdit.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.statusId === statusId) task.statusId = 'sNew';
          })
        });
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
        this.boardToEdit.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.priorityId === priorityId) task.priorityId = 'pNew';
          })
        });
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
    async addUpdate(update) {
      try {
        update.comment.byMember = this.loggedInUser;
        const [currGroup] = this.boardToEdit.groups.filter(group => group.id === update.groupId);
        const idx = currGroup.tasks.findIndex(task => task.id === update.taskId);
        currGroup.tasks[idx].comments.push(update.comment);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log("cannot add update", err);
      }
    },
    async updateTasksOrder({ tasks, groupId }) {
      try {
        const currGroup = this.boardToEdit.groups.find(group => group.id === groupId);
        currGroup.tasks.splice(0, currGroup.tasks.length, ...tasks);
        await this.$store.dispatch({ type: "saveBoard", board: this.boardToEdit });
        this.loadBoard();
      } catch (err) {
        console.log(err);
      }
    },
    async changeGroupByDrag() {
      try {
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
    loggedInUser() {
      let user = this.$store.getters.loggedInUser;
      if (!user) {
        user = {
          _id: "guest",
          fullname: "Guest",
          imgUrl:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        };
      } else {
        user = {
          _id: user._id,
          fullname: user.fullname,
          imgUrl: user.imgUrl
        };
      }
      return user;
    },
    boards() {
      return this.$store.getters.boards;
    },
    board() {
      return this.$store.getters.currBoard;
    },
    boardToShow() {
      return JSON.parse(JSON.stringify(this.board));
    },
    classObjectScreen() {
      return {
        'main-screen': this.isMainScreen,
        'main-screen-hidden': !this.isMainScreen,
      }
    },
    isFixed() {
      return this.isMainScreen ? 'position: fixed' : ''
    },
    groupsToShow() {
      if (!this.filterBy.members.length && !this.filterBy.txt) return this.boardToEdit.groups
      return this.boardToEdit.groups.reduce((acc, group) => {
        let groupCopy = JSON.parse(JSON.stringify(group))
        if (this.filterBy.members.length) {
          groupCopy.tasks = groupCopy.tasks.filter(task => {
            const members = task.members.filter(member => this.filterBy.members.includes(member._id))
            return members.length
          })
        }
        if (this.filterBy.txt) {
          const regex = new RegExp(this.filterBy.txt, 'i');
          groupCopy.tasks = groupCopy.tasks.filter(task => regex.test(task.title))
        }
        if (groupCopy.tasks.length) acc.push(groupCopy)
        return acc
      }, [])
    },
  },
  watch: {
    async "$route.params.boardId"() {
      const boardId = this.$route.params.boardId;
      await this.$store.dispatch({ type: 'loadBoard', boardId });
      this.boardToEdit = JSON.parse(JSON.stringify(this.board));
    },
    "$route"(newParamas, prevParams) {
      if (!newParamas.fullPath.includes('chart')) this.isView = false;
    }
  },
  created() {
    this.loadBoard();
    const boardId = this.$route.params.boardId;
    socketService.emit('watch-board', boardId);
    socketService.on('board-update', (boardToSave) => {
      if (boardToSave._id !== boardId) return;
      this.boardToEdit = boardToSave;
    });
    socketService.on('notifications-update', (notification) => {
      // console.log(notification);
    })
  },
  components: {
    group,
    appHeader,
    boardMemberAvatar,
    draggable,
    taskActivity
  },
};
</script>