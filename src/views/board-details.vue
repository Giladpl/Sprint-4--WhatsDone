<template>
	<section v-if="board" class="board-details">
		<ul>
			<li v-for="group in board.groups" :key="group._id">
				<group :group="group"/>
			</li>
		</ul>
	</section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import group from '@/cmps/group';

export default {
	data() {
		return {
			board: null,
		};
	},
	methods: {
		async loadBoard() {
			try {
				const id = this.$route.params.boardId;
				const board = await boardService.getById(id)
				this.board = board;
			} catch (err) {
				console.log('cannot load board', err);
			}
		},
	},
	computed: {
		loggedinUser() {
			return this.$store.getters.loggedInUser;
		},
	},
	created() {
		this.loadBoard();
	},
	components: {
		group
	}
};
</script>
