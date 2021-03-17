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
          <el-dropdown-item @click="onColorPicker">Change Color</el-dropdown-item>
          <color-picker
            v-if="isColorPicker"
            @changeColor="changeColor"
          />
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
import colorPicker from "./color-pick.vue";

export default {
  name: 'group',
  props: {
    group: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isColorPicker: false,
    }
  },
  methods: {
    removeGroup() {
      this.$emit('removeGroup', group.id);
    },
    changeColor(chosenColor) {
      this.$emit('changeColor', chosenColor)
    },
    isColorPicker() {
      this.isColorPicker = !this.isColorPicker
    }
  },
  components: {
    taskPreview,
    colorPicker
  },
};
</script>
