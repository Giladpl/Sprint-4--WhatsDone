<template>
  <section class="task-members flex">
      <ul class="task-members-list clean-list flex">
        <li v-for="member in taskMembers" :key="member._id" class="task-member flex">
          <el-avatar size="small" :src="member.imgUrl"></el-avatar>
          <p class="task-member-name">{{member.fullname}}</p>
          <i class="el-icon-minus"></i>
        </li>
      </ul>
  </section>
</template>

<script>
export default {
  props: {
    boardMembers: {
      type: Array,
      required: true,
    },
    taskMembers: {
      type: Array,
      required: true,
    },
  },
  name: "task-members",
  data() {return{}},
  created() {
  },
};
</script>

<style>
</style>