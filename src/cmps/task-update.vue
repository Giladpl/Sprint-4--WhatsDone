<template>
    <section class="update-container">
        <form @submit.prevent="addUpdate">
            <input type="text" placeholder="Write an update.." v-model="updateToEdit.update">
            <div><i class="el-icon-paperclip"></i>Add File</div>
            <button>Update</button>
        </form>
    </section>
</template>

<script>
export default {
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

