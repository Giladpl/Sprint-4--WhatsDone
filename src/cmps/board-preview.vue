<template>
    <div class="board-preview">
        <div class="card-img">
            <img :src="board.imgUrl">
        </div>
        <div class="card-title">
            <p>{{board.title}}</p>
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
        // https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif
        //https://media.giphy.com/media/YkXNjAkG7CfEVx3gcy/giphy.gif
    }
</script>