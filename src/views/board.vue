<template>
  <section class="boards-page">
    <board-list :boards="boards" />
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



