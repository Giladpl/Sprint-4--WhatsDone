<template>
    <div class="board-preview">
        <div class="card-img">
            <img :src="board.imgUrl">
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
        }
    }
</script>