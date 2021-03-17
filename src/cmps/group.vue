<template>
  <ul class="group clean-list">
    <div class="group-header">
      <el-dropdown
        size="mini"
        split-button
        type="primary"
      >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="removeGroup">Delete Group</el-dropdown-item>
          <el-dropdown-item @click.native="onColorPicker">Change Color</el-dropdown-item>
          <color-picker
            v-if="isColorPicker"
            @changeColor="changeColor"
          />
        </el-dropdown-menu>
      </el-dropdown>
      <input
        class="group-title-input"
        v-if="groupTitle"
        type="text"
        @input="updateTitle"
        v-model="groupTitle"
      >
      <div>Members</div>
      <div>Status</div>
      <div>Timeline</div>
      <div>Priority</div>
    </div>
    <li
      v-for="task in group.tasks"
      :key="task._id"
      class="task-container"
    >
      <task-preview
        @removeTask="removeTask"
        :task="task"
        :groupColor="group.color"
      />
    </li>
    <input class="input-add-task" type="text">
  </ul>
</template>

<script>
import taskPreview from "./task-preview";
import colorPicker from "./color-picker";

export default {
  name: 'group',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isColorPicker: false,
      groupTitle: null,
    }
  },
  methods: {
    removeGroup() {
      this.$emit('removeGroup', group.id);
    },
    changeColor(chosenColor) {
      this.$emit('changeColor', chosenColor)
    },
    onColorPicker() {
      this.isColorPicker = !this.isColorPicker
    },
    updateTitle() {
      this.$emit('updateTitle', this.groupTitle)
    },
    removeTask(taskId) {
      this.$emit('removeTask', taskId)
    }
  },
  created() {
    this.groupTitle = this.group.title
  },
  components: {
    taskPreview,
    colorPicker
  },
};
</script>
