<template>
  <section class="task-members flex">
    <ul class="task-members-list members-top clean-list flex">
      <li
        v-for="member in boardMembers"
        :key="member._id"
        class="task-member flex"
      >
        <el-avatar
          size="small"
          :src="member.imgUrl"
        ></el-avatar>
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
    const members = this.boardMembers.filter(member => {
      if (!this.taskMembersIds.includes(member._id)) return member
    })
    console.log('board members who arn\'t in the task:', members);
  },
};
</script>
