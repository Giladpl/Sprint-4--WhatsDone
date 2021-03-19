<template>
  <section
    class="task-preview flex-center"
    v-bind:style="{ borderLeft: `8px solid ${groupColor}` }"
  >
    <div class="main-task" @click.prevent="onTask">
      <div class="remove-title-wrapper flex">
        <div @click.stop="removeTask" class="btns-hidden">
          <i class="el-icon-delete"></i>
        </div>
        <div class="task-title">{{ task.title }}</div>
        <div class="btns-hidden"><i class="el-icon-edit"></i></div>
      </div>
      <div class="btn-chat"><i class="el-icon-chat-dot-round"></i></div>
    </div>
    <div class="members-container" @click="toggleTaskMembers">
      <ul class="members clean-list">
        <li v-for="member in task.members" :key="member._id" class="miniUser">
          <el-avatar size="small" :src="member.imgUrl"></el-avatar>
        </li>
      </ul>
      <task-members @removeMemberFromTask="removeMemberFromTask" @addMemberToTask="addMemberToTask"
        v-if="isTaskMemebersShown"
        :boardMembers="boardMembers"
        :taskMembers="task.members"
      />
    </div>
    <div>
      <div
        class="status"
        v-if="getStatusById"
        v-bind:style="{ background: getStatusById.color }"
        @click="toggleTaskStatuses"
      >
        {{ getStatusById.title }}
      </div>
      <task-status
        v-if="isTaskStatusesShown"
        :statuses="statuses" 
        @updateStatus="updateStatus"
        @addStatus="addStatus"
        @removeStatus="removeStatus"
      />
    </div>
    <div class="date-picker-container">
      <el-date-picker
        v-if="currDueDate"
        class="date-picker"
        v-model="currDueDate"
        @change="updateDueDate"
        type="date"
        size="small"
        placeholder="Pick a day"
      >
      </el-date-picker>
    </div>
    <div>
      <div
        class="priority"
        v-if="getPriorityById"
        v-bind:style="{ background: getPriorityById.color }"
      >
        {{ getPriorityById.title }}
      </div>
    </div>
  </section>
</template>

<script>
import taskMembers from "./task-members";
import taskStatus from "./task-status";

export default {
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
  },
  data() {
    return {
      currDueDate: null,
      isTaskMemebersShown: false,
      isTaskStatusesShown: false
    };
  },
  methods: {
    onTask() {
      console.log("onTask");
    },
    removeTask() {
      this.$emit("removeTask", this.task.id);
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
     removeMemberFromTask(taskMember) {
      this.$emit('removeMemberFromTask', { taskMember, taskId: this.task.id });
    },
    addMemberToTask(member) {
      this.$emit('addMemberToTask', { member, taskId: this.task.id });
    },
    updateStatus(statusId) {
      this.isTaskStatusesShown = !this.isTaskStatusesShown;
      this.$emit('updateStatus', {statusId, taskId: this.task.id});
    },
    addStatus(newStatus) {
      this.$emit('addStatus', newStatus)
    },
    removeStatus(statusId) {
      this.$emit('removeStatus', statusId);  
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
  },
  created() {
    this.currDueDate = this.task.dueDate;
  },
  components: {
    taskMembers,
    taskStatus
  },
};
</script>