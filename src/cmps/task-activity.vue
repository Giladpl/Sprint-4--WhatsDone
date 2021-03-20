<template>
    <section class="activity-container">
        <div v-for="activity in activities" :key="activity.id">
            <div class="activity flex-between">
                <div class="activity-time">{{activity.createdAt}}</div>
                <el-avatar class="activity-avatar" :src="activity.byMember.imgUrl"></el-avatar>
                <div class="activity-title">{{activity.task.title}}</div>
                <div class="activity-action">{{activity.action}}</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        activities: {
            type: Array,
            required: true
        },
    }
}
</script>