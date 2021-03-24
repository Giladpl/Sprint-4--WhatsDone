<template>
  <section class="boards-page">
    <nav>
      <div class="logo-container">
        <router-link to="/">
          <img src="@/assets/icons/increase.svg" />
          <span>WhatsDone</span>
        </router-link>
      </div>
			<router-link to="/login">Login</router-link>
			<router-link to="/login">SignUp</router-link>
		</nav>
    <h1>Try one of the boards</h1>
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
    boardList
  },
};
</script>



