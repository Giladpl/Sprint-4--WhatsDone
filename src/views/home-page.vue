<template>
  <section class="home-page">
    <h1>Hi</h1>
    <board-list :boards="boards" />
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{ "List item " + o }}
      </div>
    </el-card>
  </section>
</template>

<script>
import boardList from "@/cmps/board-list";

export default {
  name: "home-page",
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  components: {
    boardList,
  },
};
</script>


