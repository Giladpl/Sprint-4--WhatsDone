<template>
  <section
    class="task-details"
    v-click-outside="onClose"
  >
    <div
      class="close-btn"
      @click="onClose"
    ><i class="el-icon-close"></i></div>
    <div class="task-title">{{ task.title }}</div>
    <div class="btns-container">
      <span
        @click="onUpdate"
        :style="isUpdateChosen"
      >Updates</span>
      <span
        @click="onActivity"
        :style="isActivityChosen"
      >Activity Log</span>
    </div>
    <task-update
      v-if="isUpdate"
      :comments="task.comments"
      @addUpdate="addUpdate"
    />
    <task-activity
      v-if="isActivity"
      :activities="setTaskActivity"
    />
    <!-- <record-msg /> -->
  </section>
</template>

<script>
import taskUpdate from "./task-update";
import taskActivity from "./task-activity";
import vClickOutside from "v-click-outside";
import recordMsg from "./record-msg.vue";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isUpdate: true,
      isActivity: false,
    };
  },
  methods: {
    onUpdate() {
      this.isUpdate = true;
      this.isActivity = false;
    },
    onActivity() {
      this.isUpdate = false;
      this.isActivity = true;
    },
    onClose() {
      this.$emit("closeTaskDetails");
      this.$emit("toggleMainScreen");
    },
    addUpdate(comment) {
      this.$emit("addUpdate", comment);
    },
  },
  computed: {
    setTaskActivity() {
      let copyActivities = JSON.parse(JSON.stringify(this.activities));
      return copyActivities.filter(
        (activity) => activity.task.id === this.task.id
      );
    },
    isUpdateChosen() {
      return [this.isUpdate ? { textDecoration: 'underline' } : { textDecoration: 'none' }]
    },
    isActivityChosen() {
      return [this.isActivity ? { textDecoration: 'underline' } : { textDecoration: 'none' }]
    },
  },
  components: {
    taskUpdate,
    taskActivity,
    recordMsg,
  },
};
</script>
