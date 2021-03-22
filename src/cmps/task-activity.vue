<template>
  <section class="activity-container">
    <div v-for="activity in activities" :key="activity.id">
      <div class="activity flex-between">
        <div class="activity-time">{{ activity.createdAt | moment }}</div>
        <div class="avatar-title-wrapper">
          <el-avatar
            class="activity-avatar"
            :src="activity.byMember.imgUrl"
          ></el-avatar>
          <div class="popup-container" :data-title="activityTitle(activity)">
            <div class="activity-title">{{ activity.task.title }}</div>
          </div>
        </div>
        <div class="activity-action">{{ activity.action }}</div>
      </div>
    </div>
  </section>
</template>

<script>
var moment = require("moment");

export default {
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
  methods: {
    activityTitle(activity) {
      return `${activity.task.title}`;
    },
  },
  filters: {
    moment(timestamp) {
      return moment(timestamp).fromNow();
    },
  },
};
</script>