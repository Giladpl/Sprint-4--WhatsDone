<template>
  <section
    class="task-preview"
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
    <div>
      {{task.statusId}}
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
    <div>
      {{task.priorityId}}
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
  created() {
    console.log(this.$state.getters.getCurrBoard);
  }
}
</script>