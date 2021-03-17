<template>
	<section class="home-page">
		<h1>Hi</h1>
		<board-list :boards="boards"/>
	</section>
</template>

<script>
import boardList from "@/cmps/board-list";

export default {
	name: 'home-page',
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
