<template>
  <section
    class="task-preview flex-center"
    :style="{ borderLeft: `8px solid ${groupColor}` }"
  >
    <div
      class="task-left-container"
      @click.prevent="onTask"
    >
      <div class="remove-title-wrapper flex">
        <div
          @click.stop="removeTask"
          class="btns-hidden"
        >
          <i class="el-icon-delete"></i>
        </div>
        <form
          class="task-input-form"
          @submit.prevent="updateTaskTitle"
          @change.prevent="updateTaskTitle"
        >
          <input
            ref="inputTask"
            type="text"
            v-model="titleToEdit"
            class="task-title"
            value="titleToEdit"
          >
        </form>
        <div
          @click="editTitle"
          class="btns-hidden"
        ><i class="el-icon-edit"></i></div>
      </div>
      <div
        class="btn-chat"
        @click.stop="onChat"
      ><i class="el-icon-chat-dot-round"></i></div>
    </div>
    <task-details
      v-if="isTaskDetails"
      :task="task"
      :activities="activities"
      @closeTaskDetails="closeTaskDetails"
      @addUpdate="addUpdate"
      @toggleMainScreen="toggleMainScreen"
    />
    <div
      class="task-right-container"
      :style="dynamicWidth"
    >
      <div
        class="members-container"
        @click="toggleTaskMembers"
      >
        <task-members-container :task="task" />
        <task-members
          v-click-outside="toggleTaskMembers"
          @removeMemberFromTask="removeMemberFromTask"
          @addMemberToTask="addMemberToTask"
          v-if="isTaskMemebersShown"
          :boardMembers="boardMembers"
          :taskMembers="task.members"
          :task="task"
        />
      </div>
      <div class="status-container">
        <div
          class="status"
          v-if="getStatusById"
          :style="{ background: getStatusById.color }"
          @click="toggleTaskStatuses"
        >
          {{ getStatusById.title }}
        </div>
        <task-status
          v-click-outside="toggleTaskStatuses"
          v-if="isTaskStatusesShown"
          :statuses="statuses"
          @updateStatus="updateStatus"
          @addStatus="addStatus"
          @removeStatus="removeStatus"
        />
      </div>
      <div class="date-picker-container">
        <el-date-picker
          v-if="dueDateToEdit"
          class="date-picker"
          v-model="dueDateToEdit"
          @change="updateDueDate"
          type="date"
          size="small"
          placeholder="Pick a day"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="priority-container">
        <div
          class="priority"
          v-if="getPriorityById"
          v-bind:style="{ background: getPriorityById.color }"
          @click="toggleTaskPriorities"
        >
          {{ getPriorityById.title }}
        </div>
        <task-priority
          v-click-outside="toggleTaskPriorities"
          v-if="isTaskPrioritiesShown"
          :priorities="priorities"
          @updatePriority="updatePriority"
          @addPriority="addPriority"
          @removePriority="removePriority"
        />
      </div>
      <div
        class="stopwatch-container non-hidden"
        :style="dynamicHidden"
      >
        <stopwatch
          :secondsWorkedOn="task.secondsWorkedOn"
          @addTimeToTask="addTimeToTask"
        ></stopwatch>
      </div>
    </div>
  </section>
</template>

<script>
import taskMembers from "./task-members";
import taskMembersContainer from "./task-members-container";
import taskStatus from "./task-status";
import taskPriority from "./task-priority";
import vClickOutside from "v-click-outside";
import taskDetails from "./task-details";
import stopwatch from "./stopwatch";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupColor: {
      type: String,
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
      isTaskMemebersShown: false,
      isTaskStatusesShown: false,
      isTaskPrioritiesShown: false,
      isTaskDetails: false,
      isTitleEditable: false,
      dueDateToEdit: null,
      titleToEdit: null,

    };
  },
  methods: {
    onTask() {
      // console.log("onTask");
    },
    removeTask() {
      this.$emit("removeTask", this.task.id)
    },
    updateDueDate(date) {
      this.$emit("updateDueDate", { date, taskId: this.task.id });
    },

    toggleTaskMembers() {
      this.isTaskMemebersShown = !this.isTaskMemebersShown;
    },
    toggleTaskStatuses() {
      this.isTaskStatusesShown = !this.isTaskStatusesShown;
    },
    toggleTaskPriorities() {
      this.isTaskPrioritiesShown = !this.isTaskPrioritiesShown;
    },
    removeMemberFromTask(taskMember) {
      this.$emit('removeMemberFromTask', { taskMember, taskId: this.task.id });
    },
    addMemberToTask(member) {
      this.$emit('addMemberToTask', { member, taskId: this.task.id });
    },
    updateStatus(statusId) {
      this.isTaskStatusesShown = !this.isTaskStatusesShown;
      this.$emit('updateStatus', { statusId, taskId: this.task.id });
    },
    addStatus(newStatus) {
      this.$emit('addStatus', newStatus)
    },
    removeStatus(statusId) {
      this.$emit('removeStatus', statusId);
    },
    updatePriority(priorityId) {
      this.isTaskPrioritiesShown = !this.isTaskPrioritiesShown;
      this.$emit('updatePriority', { priorityId, taskId: this.task.id });
    },
    addPriority(newPriority) {
      this.$emit('addPriority', newPriority)
    },
    removePriority(priorityId) {
      this.$emit('removePriority', priorityId);
    },
    onChat() {
      this.isTaskDetails = !this.isTaskDetails;
      this.$emit('toggleMainScreen')
    },
    editTitle() {
      this.$refs.inputTask.focus()
    },
    updateTaskTitle() {
      this.isTitleEditable = !this.isTitleEditable
      this.$refs.inputTask.blur()
      this.$emit('updateTaskTitle', { updatedTitle: this.titleToEdit, taskId: this.task.id });
    },
    closeTaskDetails() {
      this.isTaskDetails = !this.isTaskDetails;
    },
    addUpdate(comment) {
      this.$emit('addUpdate', { comment, taskId: this.task.id });
    },
    toggleMainScreen() {
      this.$emit('toggleMainScreen')
    },
    addTimeToTask(update) {
      update.taskId = this.task.id
      this.$emit('addTimeToTask', update)
    }
  },
  computed: {
    getStatusById() {
      const [status] = this.statuses.filter(
        (status) => status.id === this.task.statusId
      );
      return status;
    },
    getPriorityById() {
      const [priority] = this.priorities.filter(
        (priority) => priority.id === this.task.priorityId
      );
      return priority;
    },
    dynamicWidth() {
      return [this.isStopWatch ? { 'min-width': '800px' } : { 'min-width': '700px' }]
    },
    dynamicHidden() {
      return [this.isStopWatch ? { 'display': 'flex' } : { 'display': 'none' }]
    }
  },
  watch: {
    task: {
      deep: true,
      handler() {
        this.dueDateToEdit = this.task.dueDate
        this.titleToEdit = this.task.title
      },
    },
  },
  created() {
    this.dueDateToEdit = this.task.dueDate
    this.titleToEdit = this.task.title
  },
  components: {
    taskMembers,
    taskStatus,
    taskPriority,
    taskDetails,
    taskMembersContainer,
    stopwatch
  },
};
</script>