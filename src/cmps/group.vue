<template>
  <ul class="group clean-list">
    <div class="group-header">
      <div class="group-header-left">
        <span
          class="down-arrow-container"
          @click="toggleGroupEdit"
        >

          <svg
            class="down-arrow-regular"
            :fill="group.color"
            viewBox="0 0 512 512"
          >
            <path d="M256 16C123.451 16 16 123.453 16 256S123.451 496 256 496S496 388.547 496 256S388.549 16 256 16ZM377.594 248.344L273.594 360.344C269.047 365.219 262.672 368 256 368S242.953 365.219 238.406 360.344L134.406 248.344C127.922 241.344 126.188 231.156 130 222.406C133.812 213.656 142.453 208 152 208H360C369.547 208 378.188 213.656 382 222.406C385.812 231.156 384.078 241.344 377.594 248.344Z" />
          </svg>
        </span>
        <input
          class="group-title-input"
          v-if="groupTitle"
          type="text"
          @change="updateTitle"
          v-model="groupTitle"
          :style="{ color: group.color }"
        />
      </div>
      <div
        v-click-outside="toggleGroupEdit"
        v-if="isShownGroupEdit"
        class="group-edit"
      >
        <div @click="removeGroup">
          <i class="el-icon-delete"></i>Delete Group
        </div>
        <div @click="onColorPicker">
          <i><img
              class="color-palette"
              src="@/assets/color-palette.svg"
            /></i>Change Color
        </div>
      </div>
      <color-picker
        class="color-picker"
        v-click-outside="onColorPicker"
        v-if="isColorPicker"
        @changeColor="changeColor"
      />
      <div
        class="group-header-right"
        :style="dynamicWidth"
      >
        <div>Members</div>
        <div>Status</div>
        <div>Timeline</div>
        <div>Priority</div>
        <div :style="dynamicHidden">Stopwatch</div>
        <!-- <div :class="{hidden : !this.isStopWatch}">Stopwatch</div> -->
      </div>
      <el-dropdown
        class="group-options-menu"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <i
            v-if="!isStopWatch"
            class="el-icon-circle-plus"
          ></i>
          <i
            v-else
            class="el-icon-remove"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toggleStopwatch()">Task Time Counter</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <draggable
      v-model="group.tasks"
      @start="drag = true"
      @end="drag = false"
      @change="changedByDrag"
      :scroll-sensitivity="250"
      :force-fallback="true"
      :disabled="!isDragEnabled"
      drag-class="dragging-item"
      chosen-class="chosen-item"
      ghost-class="ghost-item"
      group="tasks"
      :animation="400"
      :delay="100"
      :touchStartThreshold="3"
    >
      <li
        v-for="task in group.tasks"
        :key="task._id"
        class="task-container"
      >
        <task-preview
          :task="task"
          :groupColor="group.color"
          :statuses="statuses"
          :priorities="priorities"
          :boardMembers="boardMembers"
          :activities="activities"
          :isStopWatch="isStopWatch"
          @removeMemberFromTask="removeMemberFromTask"
          @addMemberToTask="addMemberToTask"
          @removeTask="removeTask"
          @updateDueDate="updateDueDate"
          @updateStatus="updateStatus"
          @addStatus="addStatus"
          @removeStatus="removeStatus"
          @updatePriority="updatePriority"
          @addPriority="addPriority"
          @removePriority="removePriority"
          @updateTaksTitle="updateTaskTitle"
          @updateTaskTitle="updateTaskTitle"
          @addUpdate="addUpdate"
          @toggleMainScreen="toggleMainScreen"
          @addTimeToTask="addTimeToTask"
        />
      </li>
    </draggable>
    <input
      ref="addTaskInput"
      @keyup.enter="addTask"
      class="input-add-task"
      type="text"
      placeholder="+ Add"
    />
    <div class="bars-container">
      <div class="bars-container-left"></div>
      <div
        class="bars-container-right"
        :style="this.isStopWatch ? dynamicWideBar : dynamicNarrowBar"
      >
        <div class="space"></div>
        <status-bar
          :style="this.isStopWatch ? '' : statusBarPatch"
          :statuses="statuses"
          :tasks="group.tasks"
        />
        <div class="space"></div>
        <priority-bar
          :priorities="priorities"
          :tasks="group.tasks"
        />
      </div>
    </div>
  </ul>
</template>

<script>
import taskPreview from "./task-preview";
import colorPicker from "./color-picker";
import draggable from "vuedraggable";
import statusBar from '../cmps/status-bar';
import priorityBar from '../cmps/priority-bar';
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  name: "group",
  props: {
    group: {
      type: Object,
      required: true,
    },
    statuses: {
      type: Array,
      required: true,
    },
    priorities: {
      type: Array,
      required: true,
    },
    boardMembers: {
      type: Array,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
    isStopWatch: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isColorPicker: false,
      groupTitle: null,
      isShownGroupEdit: false,
      isDragEnabled: true,
    };
  },
  methods: {
    removeGroup() {
      this.$emit("removeGroup", { groupId: this.group.id });
    },
    changeColor(chosenColor) {
      this.isColorPicker = !this.isColorPicker;
      this.isShownGroupEdit = !this.isShownGroupEdit;
      this.$emit("changeColor", { chosenColor, groupId: this.group.id });
    },
    onColorPicker() {
      this.isColorPicker = !this.isColorPicker;
    },
    updateTitle() {
      this.$emit("updateTitle", {
        title: this.groupTitle,
        groupId: this.group.id,
      });
    },
    removeTask(taskId) {
      this.$emit("removeTask", { taskId, groupId: this.group.id });
    },
    toggleGroupEdit() {
      this.isShownGroupEdit = !this.isShownGroupEdit;
      if (this.isColorPicker) this.isColorPicker = false;
    },
    addTask(ev) {
      this.$emit("addTask", {
        taskTitle: ev.target.value,
        groupId: this.group.id,
      });
      this.$refs["addTaskInput"].value = "";
    },
    updateDueDate(update) {
      update.groupId = this.group.id;
      this.$emit("updateDueDate", update);
    },
    removeMemberFromTask(update) {
      update.groupId = this.group.id;
      this.$emit('removeMemberFromTask', update);
    },
    addMemberToTask(update) {
      update.groupId = this.group.id;
      this.$emit('addMemberToTask', update);
    },
    updateStatus(update) {
      update.groupId = this.group.id;
      this.$emit('updateStatus', update);
    },
    addStatus(newStatus) {
      this.$emit('addStatus', newStatus)
    },
    removeStatus(statusId) {
      this.$emit('removeStatus', statusId);
    },
    updatePriority(update) {
      update.groupId = this.group.id;
      this.$emit('updatePriority', update);
    },
    addPriority(newPriority) {
      this.$emit('addPriority', newPriority)
    },
    removePriority(priorityId) {
      this.$emit('removePriority', priorityId);
    },
    updateTaskTitle(update) {
      update.groupId = this.group.id
      this.$emit('updateTaskTitle', update);
    },
    changedByDrag() {
      this.$emit('updateTasksOrder', { groupId: this.group.id, tasks: this.group.tasks })
    },
    addUpdate(update) {
      update.groupId = this.group.id;
      this.$emit('addUpdate', update);
    },
    toggleMainScreen() {
      this.$emit('toggleMainScreen')
      this.toggleDragging()
    },
    addTimeToTask(update) {
      update.groupId = this.group.id
      this.$emit('addTimeToTask', update)
    },
    toggleStopwatch() {
      this.$emit('toggleStopwatch')
    },
    toggleDragging() {
      this.isDragEnabled = !this.isDragEnabled;
    },

  },
  computed: {
    dynamicWidth() {
      return [this.isStopWatch ? { 'min-width': '800px' } : { 'min-width': '700px' }]
    },
    dynamicHidden() {
      return [this.isStopWatch ? { 'display': 'block' } : { 'display': 'none' }]
    },
    dynamicNarrowBar() {
      return { 'justify-content': 'space-between', 'transform': 'translateX(-2.5%)', 'min-width': '700px' }
    },
    dynamicWideBar() {
      return { 'justify-content': 'unset', 'transform': 'translateX(-4%)', 'min-width': '800px' }
    },
    statusBarPatch() {
      return { 'transform': 'translateX(-6%)' }
    },

  },
  watch: {
    group: {
      deep: true,
      handler() {
        this.groupTitle = this.group.title;
      },
    },
  },
  created() {
    this.groupTitle = this.group.title;
  },
  components: {
    taskPreview,
    colorPicker,
    draggable,
    statusBar,
    priorityBar
  },
};
</script>
