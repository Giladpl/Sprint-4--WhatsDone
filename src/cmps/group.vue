<template>
  <ul class="group clean-list">
    <div class="group-header">
      <span @click="toggleGroupEdit"><i class="el-icon-arrow-down"></i></span>
      <div
        v-if="isShownGroupEdit"
        class="group-edit"
      >
        <div @click="removeGroup"><i class="el-icon-delete"></i>Delete Group</div>
        <div @click="onColorPicker"><i><img
              class="color-palette"
              src="@/assets/color-palette.svg"
            ></i>Change Color</div>
      </div>
      <color-picker
        v-if="isColorPicker"
        @changeColor="changeColor"
      />
      <input
        class="group-title-input"
        v-if="groupTitle"
        type="text"
        @change="updateTitle"
        v-model="groupTitle"
      >
      <div>Members</div>
      <div>Status</div>
      <div>Timeline</div>
      <div>Priority</div>
    </div>
    <draggable
      v-model="group.tasks"
      @start="drag=true"
      @end="drag=false"
    >
      <li
        v-for="task in group.tasks"
        :key="task._id"
        class="task-container"
      >
        <task-preview
          @removeTask="removeTask"
          :task="task"
          :groupColor="group.color"
          :statuses="statuses"
          :priorities="priorities"
        />
      </li>
    </draggable>

    <input @keyup.enter="addTask"
      class="input-add-task"
      type="text"
      placeholder="+ Add"
    >
  </ul>
</template>

<script>
import taskPreview from "./task-preview";
import colorPicker from "./color-picker";
import draggable from 'vuedraggable'


export default {
  name: 'group',
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
  },
  data() {
    return {
      isColorPicker: false,
      groupTitle: null,
      isShownGroupEdit: false,
    }
  },
  methods: {
    removeGroup() {
      this.$emit('removeGroup', { groupId: this.group.id });
    },
    changeColor(chosenColor) {
      this.$emit('changeColor', chosenColor)
    },
    onColorPicker() {
      this.isColorPicker = !this.isColorPicker
    },
    updateTitle() {
      this.$emit('updateTitle', {title: this.groupTitle, groupId: this.group.id})
    },
    removeTask(taskId) {
      this.$emit('removeTask', { taskId, groupId: this.group.id })
    },
    toggleGroupEdit() {
      this.isShownGroupEdit = !this.isShownGroupEdit
    },
    addTask(ev){
      this.$emit('addTask', {task: ev.target.value, groupId: this.group.id})
    },
  },
  created() {
    this.groupTitle = this.group.title
  },
  components: {
    taskPreview,
    colorPicker,
    draggable
  },
};
</script>
