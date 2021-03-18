<template>
  <section>
    <div class="task-members">
      <ul class="task-members-list clean-list">
        <li v-for="member in task.members" :key="member._id" class="miniUser">
          <el-avatar size="small" :src="member.imgUrl"></el-avatar>
          <p class="task-member-name">{{member.fullname}}</p>
        </li>
      </ul>
    </div>
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
  data() {},
  created() {},
};
</script>

<style>
</style>