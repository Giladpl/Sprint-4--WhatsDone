<template>
  <section class="task-members flex">
    <ul class="task-members-list clean-list flex">
      <li
        v-for="member in nonDuplicatedMembers"
        :key="member._id"
        class="task-member flex"
      >
        <el-avatar
          size="small"
          :src="member.imgUrl"
        ></el-avatar>
        <p class="task-member-name">{{member.fullname}}</p>
        <!-- <i class="el-icon-plus"></i> -->
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
  data() {
    return {
      taskMembersIds: [],
      nonDuplicatedMembers: [],
    }
  },
  methods: {

  },
  computed: {

  },
  created() {
    this.taskMembersIds = this.taskMembers.reduce((acc, member) => {
      acc.push(member._id)
      return acc
    }, [])
    this.nonDuplicatedMembers = this.boardMembers.filter(member => {
      if (!this.taskMembersIds.includes(member._id)) return member
    })
    
  },
};
</script>

<style>
</style>