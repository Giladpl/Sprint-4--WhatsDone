<template>
  <ul
    v-if="board"
    class="members clean-list"
  >
    <li
      v-for="member in board.members.slice(0,3)"
      :key="member._id"
      class="miniUser"
    >
      <el-avatar
        size="small"
        :src="member.imgUrl"
      ></el-avatar>
    </li>
    <el-avatar v-if="restOfMembersAvatar > 0"
      class="rest-of-members-avatar"
      size="small"
    >+{{restOfMembersAvatar}}</el-avatar>
  </ul>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    members: {
      type: Array,
      required: true
    }
  },
  computed: {

    restOfMembersAvatar() {
      return this.board.members.length - 3
    }
  },

}
</script>

<style>
</style>