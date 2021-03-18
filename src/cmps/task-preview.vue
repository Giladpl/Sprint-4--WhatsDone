<template>
  <section
    class="task-preview flex-center"
    v-bind:style="{borderLeft: `8px solid ${groupColor}`}"
  >
    <div
      class="main-task"
      @click.prevent="onTask"
    >
      <div class="remove-title-wrapper flex">
        <div
          @click.stop="removeTask"
          class="btns-hidden"
        ><i class="el-icon-delete"></i></div>
        <div class="task-title">{{task.title}}</div>
      <div class="btns-hidden"><i class="el-icon-edit"></i></div>
      </div>
      <div class="btn-chat"><i class="el-icon-chat-dot-round"></i></div>
    </div>
    <div>
      <ul class="members clean-list">
        <li
          v-for="member in task.members"
          :key="member._id"
          class="miniUser"
        >
          <el-avatar
            size="small"
            :src="member.imgUrl"
          ></el-avatar>
        </li>
      </ul>
    </div>
    <div v-if="getStatusById" v-bind:style="{background: getStatusById.color}">
      {{getStatusById.title}}
    </div>
    <div>
      <el-date-picker
        v-model="task.dueDate"
        type="date"
        size="small"
        placeholder="Pick a day"
      >
      </el-date-picker>
    </div>
    <div v-if="getPriorityById" v-bind:style="{background: getPriorityById.color}">
      {{getPriorityById.title}}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    groupColor: {
      type: String,
      required: true
    },
    statuses: {
      type: Array,
      required: true,
    },
    priorities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currStatus: null
    }
  },
  methods: {
    onTask() {
      console.log('onTask');
    },
    removeTask() {
      this.$emit('removeTask', this.task.id);
    }
  },
  computed: {
    getStatusById() {
      const [status] = this.statuses.filter(status => status.id === this.task.statusId)
      return status
    },
    getPriorityById() {
      const [priority] = this.priorities.filter(priority => priority.id === this.task.priorityId)
      return priority
    }
  },
  created() {
    // console.log(this.statuses);
  }
}
</script>