<template>
  <section class="activity-container">
    <div
      v-for="activity in activities"
      :key="activity.id"
    >
      <div class="activity flex-between">
<<<<<<< HEAD
        <div class="activity-time">{{(activity.createdAt)}}</div>
=======
        <div class="activity-time">{{activity.createdAt | moment}}</div>
>>>>>>> 74b0e590ecdf710b29becedc9c0cfbf2097dda21
        <el-avatar
          class="activity-avatar"
          :src="activity.byMember.imgUrl"
        ></el-avatar>
        <div class="activity-title">{{activity.task.title}}</div>
        <div class="activity-action">{{activity.action}}</div>
      </div>
    </div>
  </section>
</template>

<script>

<<<<<<< HEAD
// import moment from 'moment';
=======
var moment = require('moment');
>>>>>>> 74b0e590ecdf710b29becedc9c0cfbf2097dda21

export default {
  props: {
    activities: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
    }
  },
<<<<<<< HEAD
  methods: {
    createdAtForDiaplay(timestamp) {
      return moment(timestamp, 'YYYY-MM-DD').fromNow();
=======
  filters: {
    moment(timestamp) {
      return moment(timestamp).fromNow();
>>>>>>> 74b0e590ecdf710b29becedc9c0cfbf2097dda21
    }
  }
}
</script>