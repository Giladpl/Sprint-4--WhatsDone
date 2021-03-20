<template>
    <section class="task-details">
        <div class="close-btn"><i class="el-icon-close"></i></div>
        <div class="task-title">{{task.title}}</div>
        <div class="btns-container">
            <span @click="onUpdate">Updates</span>
            <span @click="onActivity">Activity Log</span>
        </div>
        <div v-if="isUpdate" class="update-container">
            <form @submit.prevent="addUpdate">
                <input type="text" placeholder="Write an update..">
                <button>Update</button>
            </form>
        </div>
        <div v-if="isActivity" class="activity-container">

        </div>
    </section>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            isUpdate: true,
            isActivity: false
        }
    },
    methods: {
        onUpdate() {
            this.isUpdate = true;
            this.isActivity = false;
        },
        onActivity() {
            this.isUpdate = false;
            this.isActivity = true;
        }
    }
}
</script>
