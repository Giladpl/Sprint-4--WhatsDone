<template>
	<div class="main-layout">
		<router-view />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {
		// this.$store.dispatch({
		// 	type: "loadBoards",
		// 	filterBy: { name: "", type: "All", stock: "All" },
		// });
		// console.log("Vue App was created!!!");
	},
	components: {},
};
</script>
