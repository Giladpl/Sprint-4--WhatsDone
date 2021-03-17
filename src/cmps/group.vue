<template>
  <ul class="group clean-list">
    <div class="group-header">
      <span @click="toggleGroupEdit"><i class="el-icon-arrow-down"></i></span>
      <div class="group-edit">
        <div @click.native="removeGroup"><i class="el-icon-delete"></i>Delete Group</div>
        <div @click.native="onColorPicker"><i class="el-icon-delete"></i>Change Color</div>
      </div>
        <color-picker
          v-if="isColorPicker"
          @changeColor="changeColor"
        />
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
    <input class="input-add-task" type="text" placeholder="+ Add">
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
    },
    toggleGroupEdit() {
      console.log('not done');
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
