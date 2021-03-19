<template>
  <section class="task-members-list flex">
    <ul class="clean-list">
      <li @click="removeFromTask"
        class="task-member flex"
        v-for="member1 in taskMembers"
        :key="member1._id"
      >
        <el-avatar
          size="small"
          :src="member1.imgUrl"
        ></el-avatar>
        <p class="task-member-name">{{ member1.fullname }}</p>
        <i class="el-icon-minus"></i>
      </li>
    </ul>
    <div class="line-separator-members"> <span class="title-line-separator">Members to Add:</span> </div>
    <ul class="clean-list">
      <li @click="removeFromBoard"
        class="task-member flex"
        v-for="member in nonDuplicatedMembers"
        :key="member._id"
      >
        <el-avatar
          size="small"
          :src="member.imgUrl"
        ></el-avatar>
        <p class="task-member-name">{{ member.fullname }}</p>
        <i class="el-icon-plus"></i>
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
    };
  },
  methods: {},
  computed: {},
  created() {
    console.log("Board members:", this.boardMembers);
    console.log("Task members:", this.taskMembers);

    this.taskMembersIds = this.taskMembers.reduce((acc, member) => {
      acc.push(member._id);
      return acc;
    }, []);
    this.nonDuplicatedMembers = this.boardMembers.filter((member) => {
      if (!this.taskMembersIds.includes(member._id)) return member;
    });
    console.log(
      "board members who arn't task members:",
      this.nonDuplicatedMembers
    );
  },
};
</script>
