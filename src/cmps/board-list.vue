<template>
	<ul class="board-list clean-list flex">
		<li v-for="board in boards.slice(0, 2)" :key="board._id" class="board-preview-container">
            <router-link class="router-link-card router-link flex-center " :to="'/board/' + board._id"><board-preview :board="board" /></router-link>
		</li>
	</ul>
</template>

<script>
import boardPreview from "./board-preview";

export default {
	props: {
		boards: {
			type: Array,
			required: true,
		},
	},
	components: {
		boardPreview,
	},
};
</script>