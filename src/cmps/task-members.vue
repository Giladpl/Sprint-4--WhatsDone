<template>
  <section class="task-members-list flex">
      <el-input class="members-search"
        @input="boardMembersToShow()"
        @click.native.stop=""
        ref="searchInput"
        placeholder="Search for a name"
        v-model="filterBy.name"
      ></el-input>
    <ul class="clean-list">
      <li
        @click.stop="removeMemberFromTask(taskMember)"
        class="task-member flex"
        v-for="taskMember in taskMembers"
        :key="taskMember._id"
      >
        <el-avatar
          size="small"
          :src="taskMember.imgUrl"
        ></el-avatar>
        <p class="task-member-name">{{ taskMember.fullname }}</p>
        <i class="el-icon-minus"></i>
      </li>
    </ul>
    <div class="line-separator-members">
      <span class="title-line-separator">Members to Add:</span>
    </div>
    <ul class="clean-list">
      <li
        @click.stop="addMemberToTask(member)"
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
  name: 'task-members',
  data() {
    return {
      taskMembersIds: [],
      nonDuplicatedMembers: [],
      filterBy: {
        name: null
      }
    };
  },
  methods: {
    removeMemberFromTask(taskMember) {
      this.$emit('removeMemberFromTask', taskMember);
    },
    addMemberToTask(member) {
      this.$emit('addMemberToTask', member);
    },
    boardMembersToShow() {
      this.taskMembersIds = this.taskMembers.reduce((acc, member) => {
        acc.push(member._id);
        return acc;
      }, []);
      this.nonDuplicatedMembers = this.boardMembers.filter((member) => {
        if (!this.taskMembersIds.includes(member._id)) return member;
      }).filter(member => {
        const regex = new RegExp(this.filterBy.name, 'i');
        return !this.filterBy.name || regex.test(member.fullname)
      });
    },
  },
  computed: {},
  created() {
    this.boardMembersToShow();
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  watch: {
    boardMembers: {
      deep: true,
      handler() {
        this.boardMembersToShow();
      }
    },
    taskMembers: {
      deep: true,
      handler() {
        this.boardMembersToShow();
      }
    }
  }
};
</script>
