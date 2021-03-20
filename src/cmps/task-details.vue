<template>
    <section class="task-details">
        <div class="close-btn"><i class="el-icon-close"></i></div>
        <div class="task-title">{{task.title}}</div>
        <div class="btns-container">
            <span @click="onUpdate">Updates</span>
            <span @click="onActivity">Activity Log</span>
        </div>
        <task-update v-if="isUpdate" :comments="task.comments"/>
        <task-activity v-if="isActivity"/>
    </section>
</template>

<script>
import taskUpdate from './task-update'
import taskActivity from './task-activity'

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
    },
    components: {
        taskUpdate,
        taskActivity
    }
}
</script>
