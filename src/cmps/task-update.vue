<template>
    <section class="update-container">
        <form @submit.prevent="addUpdate">
            <input type="text" placeholder="Write an update.." v-model="updateToEdit.update">
            <div><i class="el-icon-paperclip"></i>Add File</div>
            <button>Update</button>
        </form>
        <div v-if="comments" class="comment-content">
            <div 
            v-for="comment in comments"
            :key="comment.id"
            >
                <el-avatar class="comment-avatar" :src="comment.byMember.imgUrl"></el-avatar>
                <div class="comment-fullname">{{comment.byMember.fullname}}</div>
                <div class="comment-time">{{comment.createdAt}}</div>
                <div class="comment-update">{{comment.update}}</div>
                <div class="like-btn">Like</div>
                <div class="reply-btn">Reply</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            updateToEdit: {
                update: null,
                file: null,
                createdAt: null,
                byMember: null
            }
        }
    },
    methods: {
        addUpdate() {
            console.log('addUpdate');
        }
    }
}
</script>

