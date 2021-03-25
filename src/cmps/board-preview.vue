<template>
    <div class="board-preview">
        <div class="card-img">
            <img v-if="isImg" src="@/assets/icons/programming.svg">
            <img v-if="!isImg" src="@/assets/icons/travelers.svg">
        </div>
        <div class="card-title">
            <p>{{board.title}}</p>
        </div>
        <div class="card-description">
            <p>{{board.description}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            board: {
                type: Object,
                required: true
            }
        },
        computed: {
            isImg() {
                return this.board._id === '6059efa4364773a1b1dba789'
            }
        }
    }
</script>