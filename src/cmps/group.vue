<template>
  <ul class="group">
    <div class="flex">

      <el-dropdown
        size="mini"
        split-button="false"
        type="primary"
      >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="removeGroup">Delete Group</el-dropdown-item>
          <el-dropdown-item @click="chooseColor">Change Color</el-dropdown-item>
          
        </el-dropdown-menu>
      </el-dropdown>

      <div>{{group.title}}</div>
      <div>Members</div>
      <div>Status</div>
      <div>Timeline</div>
      <div>Priority</div>
    </div>
    <li
      v-for="task in tasks"
      :key="task._id"
      class="task-container"
    >
      <task-preview
        :task="task"
        :groupColor="groupColor"
      />
    </li>
  </ul>
</template>

<script>
import taskPreview from "./task-preview.vue";

export default {
  props: {
    group: {
      type: Array,
      required: true,
    },
  },
  methods: {
    remove(group) {
      this.$emit("remove", group);
    },
  },
  components: {
    taskPreview,
  },
};
</script>
